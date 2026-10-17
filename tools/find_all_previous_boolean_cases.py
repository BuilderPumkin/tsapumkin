import json
import re
import sys
import sympy

sys.stdout.reconfigure(encoding="utf-8")
sys.path.insert(0, "pumkin-math-api")
from app.latex import parse_latex

with open("public/data/questions/all.json", encoding="utf-8") as f:
    questions = json.load(f)

boolean_cases = []

for q in questions:
    qid = q.get("id")
    fields = [("stem", q.get("question_text", ""))]
    for i, opt in enumerate(q.get("options") or []):
        fields.append((f"opt_{i+1}", opt))
    fields.append(("explanation", q.get("explanation", "")))

    for fld, text in fields:
        if not text:
            continue
        # extract all snippets
        for m in re.finditer(r"\$(.*?)\$|\\\((.*?)\\\)|\\\[(.*?)\\\]", text):
            snip = m.group(1) or m.group(2) or m.group(3)
            if not snip or len(snip.strip()) < 2:
                continue
            snip_clean = snip.strip()
            
            # Check if this snippet previously evaluated to boolean
            # We can check what it parsed to with evaluated relations,
            # or check if current parser produces ChainedRelation or Eq(evaluate=False)
            res = parse_latex(snip_clean)
            if res.is_success:
                # Check what old SymPy would have done if Eq/And was evaluated
                expr = res.expr
                # If current expr is BooleanTrue or BooleanFalse, that's a direct bug!
                if isinstance(expr, (sympy.logic.boolalg.BooleanTrue, sympy.logic.boolalg.BooleanFalse, bool)):
                    boolean_cases.append({
                        "qid": qid,
                        "field": fld,
                        "latex": snip_clean,
                        "old_eval": repr(expr),
                        "current_expr": repr(expr),
                        "status": "STILL_BOOLEAN"
                    })
                elif hasattr(expr, "expressions") and hasattr(expr, "operators"):
                    # ChainedRelation: old parser evaluated this to sympy.And which often collapsed to False/True
                    # Let's test if old evaluated Eq would give boolean
                    boolean_cases.append({
                        "qid": qid,
                        "field": fld,
                        "latex": snip_clean,
                        "current_expr": repr(expr),
                        "type": "ChainedRelation"
                    })
                elif isinstance(expr, sympy.core.relational.Relational):
                    # Check if lhs and rhs evaluate to numbers
                    try:
                        evaluated = expr.lhs == expr.rhs
                        # If lhs and rhs are numbers and equal or unequal
                        if expr.lhs.is_number and expr.rhs.is_number:
                            boolean_cases.append({
                                "qid": qid,
                                "field": fld,
                                "latex": snip_clean,
                                "old_eval": str(bool(expr)),
                                "current_expr": repr(expr),
                                "type": "EvaluatedRelational"
                            })
                    except Exception:
                        pass

print(f"Total chained/relational cases found: {len(boolean_cases)}")
with open("tools/boolean_audit_results.json", "w", encoding="utf-8") as f:
    json.dump(boolean_cases, f, ensure_ascii=False, indent=2)
