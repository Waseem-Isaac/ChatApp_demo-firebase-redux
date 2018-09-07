
/**
 * Orbstream client SDK
 *
 * @param 	Object 		options
 * @param 	Function 	onready
 *
 * @return void
 */
exports.Orbstream = function Orbstream(options, onready)
{
	/**
	 * @var WebSocket
	 */
	var ws;
	/**
	 * @var Object
	 */
	var listeners = {
		messages: {},
		connections: {},
		disconnections: {},
	}

	var helpers = function(ws)
	{
		/**
		 * Our websocket connection
		 *
		 * @var WebSocket
		 */
		this.ws = ws

		/**
		 * subsribe to a channel events/messages
		 *
		 * @param 	String 		channel
		 * @param 	Function 	cb
		 *
		 * @return this
		 */
		this.subscribe = function(channel, cb){
			ws.send(JSON.stringify({
				action: "@subscribe",
				value: channel
			}))
			listeners.messages[channel] = cb
			return this
		}

		/**
		 * Trigger an event when a client goes online
		 *
		 * @param 	String 		channel
		 * @param 	Function 	cb
		 *
		 * @return this
		 */
		this.online = function(channel, cb){
			listeners.connections[channel] = cb
			return this
		}

		/**
		 * Trigger an event when a client goes online
		 *
		 * @param 	String 		channel
		 * @param 	Function 	cb
		 *
		 * @return this
		 */
		this.offline = function(channel, cb){
			listeners.disconnections[channel] = cb
			return this
		}

		/**
		 * unsubsribe from a channel events/messages
		 *
		 * @param 	String 		channel
		 *
		 * @return this
		 */
		this.unsubscribe = function(channel){
			ws.send(JSON.stringify({
				action: "@unsubscribe",
				value: channel
			}))
			delete listeners.messages[channel]
			delete listeners.connections[channel]
			delete listeners.disconnections[channel]
			return this
		}
	}

	/**
	 * The main websocket connector
	 *
	 * this connector automatically reconnects if the connection has been closed
	 *
	 */
	var connector = function(){
		ws = new WebSocket(options.url.trim("/") + "/stream/" + options.appId + "/messages")
		ws.onopen = function(){onready(new helpers(ws))}
		ws.onclose = function(){connector()}
		ws.onerror = function(){}
		ws.onmessage = function(msg){
			try {
				var event = JSON.parse(msg.data)
				if ( event.type == "@state" && event.body.online ) {
					cb = listeners.connections[event.channel]
					cb && cb(event.body.id, event.body.time)
				} else if ( event.type == "@state" && ! event.body.online ) {
					cb = listeners.disconnections[event.channel]
					cb && cb(event.body.id, event.body.time)
				} else if ( event.type == "@message"  ) {
					cb = listeners.messages[event.channel]
					cb && cb(event.body, event)
				}
			} catch (e) {
				console.log(e)
			}
		}
	}

	// let's play ^_^!
	connector()
}