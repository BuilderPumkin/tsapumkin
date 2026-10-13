/**
 * LIVE EXAM CLIENT
 * Connects to Cloudflare Durable Objects via WebSocket.
 */
class LiveExamClient {
    constructor(pin, userId, isHost) {
        this.pin = pin;
        this.userId = userId;
        this.isHost = isHost;
        this.ws = null;
        this.reconnectAttempts = 0;
        this.MAX_RECONNECT = 5;
        this.heartbeatInterval = null;
        this.isDisconnecting = false;
        
        // Callbacks defined by PumkinLiveExam
        this.onStateChange = null;
        this.onParticipantsUpdate = null;
    }

    connect() {
        this.isDisconnecting = false;
        
        // Check if we are running locally (without Cloudflare backend)
        const hostname = window.location.hostname;
        if (window.location.protocol === 'file:' || hostname === 'localhost' || hostname === '127.0.0.1') {
            console.warn("LiveExamClient: Running in local/offline mode. Live Challenge is simulated.");
            setTimeout(() => {
                if (this.onStateChange) this.onStateChange("waiting");
                if (this.onParticipantsUpdate) {
                    this.onParticipantsUpdate([{
                        userId: this.userId.substring(0, 5) + "***",
                        status: "connected",
                        progress: 0
                    }]);
                }
            }, 500);
            return;
        }

        // Production WebSocket URL mapping
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/api/live/join?pin=${this.pin}&userId=${this.userId}&isHost=${this.isHost}`;
        
        try {
            this.ws = new WebSocket(wsUrl);

            this.ws.onopen = () => {
                this.reconnectAttempts = 0;
                
                // Heartbeat to keep connection alive
                this.heartbeatInterval = setInterval(() => {
                    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                        this.ws.send(JSON.stringify({ type: 'HEARTBEAT', ts: Date.now() }));
                    }
                }, 30000);
            };

            this.ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'ROOM_STATE') {
                        if (this.onStateChange) this.onStateChange(data.state);
                        if (this.onParticipantsUpdate) this.onParticipantsUpdate(data.participants);
                    } else if (data.type === 'PARTICIPANT_UPDATE') {
                        if (this.onParticipantsUpdate) this.onParticipantsUpdate(data.participants);
                    } else if (data.type === 'ERROR') {
                        console.error("LiveExam Error:", data.message);
                    }
                } catch (e) {
                    console.error("Failed to parse WS message", e);
                }
            };

            this.ws.onclose = () => {
                if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
                if (!this.isDisconnecting && this.reconnectAttempts < this.MAX_RECONNECT) {
                    setTimeout(() => {
                        this.reconnectAttempts++;
                        this.connect();
                    }, Math.pow(2, this.reconnectAttempts) * 1000);
                }
            };
            
            this.ws.onerror = (err) => {
                console.error("WebSocket error", err);
            };
        } catch (error) {
            console.error("Error creating WebSocket:", error);
        }
    }

    disconnect() {
        this.isDisconnecting = true;
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    sendHostAction(action) {
        if (!this.isHost) return;
        
        // Local simulation
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            if (this.onStateChange) this.onStateChange(action);
            return;
        }

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'HOST_ACTION',
                action: action
            }));
        }
    }
    
    submitProgress(progress) {
        // Local simulation
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            if (this.onParticipantsUpdate) {
                this.onParticipantsUpdate([{
                    userId: this.userId.substring(0, 5) + "***",
                    status: "connected",
                    progress: progress
                }]);
            }
            return;
        }

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: 'SUBMIT_PROGRESS',
                progress: progress
            }));
        }
    }
}

window.LiveExamClient = LiveExamClient;
