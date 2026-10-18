from app.schemas.check import (
    AnswerTypeEnum,
    CheckRequest,
    CheckResponse,
    CheckResultPayload,
    CheckVerdictEnum,
)
from app.schemas.common import (
    BaseResponseEnvelope,
    ConfidenceInfo,
    ConfidenceLevel,
    ConfidenceMethod,
    ErrorDetail,
    HealthResponse,
    StatusEnum,
    StepItem,
    StrictBaseModel,
    UnsupportedReasonEnum,
)
from app.schemas.dsl import (
    AlgebraicEquationDSL,
    AsymptoteDSL,
    BaseDSL,
    BasicDerivativeDSL,
    CombinatoricsProbabilityDSL,
    DifferentialEquationDSL,
    ExponentialLogDSL,
    ExtremaDSL,
    GeometryOxyzDSL,
    IntegralDSL,
    IntegralInitialCondition,
    LastDigitDSL,
    LimitSequenceDSL,
    LinearAlgebraDSL,
    MathProblemDSL,
    MatrixAlgebraDSL,
    MinMaxIntervalDSL,
    MonotonicityDSL,
    OtherFunctionDSL,
    ParameterMDSL,
    PlanarAreaDSL,
    RealWorldOptimizationDSL,
    SequenceProgressionDSL,
    TriangleVectorDSL,
    TrigonometricDSL,
    UnsupportedProblemDSL,
    VariationTableDSL,
)
from app.schemas.generate import (
    DifficultyEnum,
    DistractorItem,
    GeneratedQuestionItem,
    GenerateRequest,
    GenerateResponse,
    GenerateResultPayload,
)
from app.schemas.geometry_oxyz import GeometryOxyzResult
from app.schemas.integral import IntegralResult
from app.schemas.last_digit import LastDigitResult
from app.schemas.matrix_algebra import MatrixAlgebraResult
from app.schemas.planar_area import PlanarAreaResult
from app.schemas.sequence import SequenceProgressionResult
from app.schemas.solve import SolveRequest, SolveResponse, SolveResultPayload
from app.schemas.traps import MisconceptionTrapEnum
from app.schemas.triangle_vector import TriangleVectorResult
from app.schemas.trigonometric import TrigonometricResult

__all__ = [
    # Common & Envelope
    "StrictBaseModel",
    "StatusEnum",
    "ConfidenceLevel",
    "ConfidenceMethod",
    "ConfidenceInfo",
    "UnsupportedReasonEnum",
    "StepItem",
    "ErrorDetail",
    "BaseResponseEnvelope",
    "HealthResponse",
    # Traps
    "MisconceptionTrapEnum",
    # DSL
    "BaseDSL",
    "MonotonicityDSL",
    "BasicDerivativeDSL",
    "ExtremaDSL",
    "MinMaxIntervalDSL",
    "ParameterMDSL",
    "RealWorldOptimizationDSL",
    "VariationTableDSL",
    "AsymptoteDSL",
    "OtherFunctionDSL",
    "IntegralDSL",
    "IntegralInitialCondition",
    "IntegralResult",
    "ExponentialLogDSL",
    "LimitSequenceDSL",
    "LinearAlgebraDSL",
    "MatrixAlgebraDSL",
    "MatrixAlgebraResult",
    "DifferentialEquationDSL",
    "AlgebraicEquationDSL",
    "GeometryOxyzDSL",
    "GeometryOxyzResult",
    "CombinatoricsProbabilityDSL",
    "LastDigitDSL",
    "LastDigitResult",
    "SequenceProgressionDSL",
    "SequenceProgressionResult",
    "PlanarAreaDSL",
    "PlanarAreaResult",
    "TrigonometricDSL",
    "TrigonometricResult",
    "TriangleVectorDSL",
    "TriangleVectorResult",
    "UnsupportedProblemDSL",
    "MathProblemDSL",
    # Solve
    "SolveRequest",
    "SolveResultPayload",
    "SolveResponse",
    # Check
    "AnswerTypeEnum",
    "CheckVerdictEnum",
    "CheckRequest",
    "CheckResultPayload",
    "CheckResponse",
    # Generate
    "DifficultyEnum",
    "DistractorItem",
    "GeneratedQuestionItem",
    "GenerateRequest",
    "GenerateResultPayload",
    "GenerateResponse",
]
