import mongoose from 'mongoose'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const STATUS_DISCONNECTED  = 0 
const STATUS_CONNECTED     = 1
const STATUS_CONNECTING    = 2 
const STATUS_DISCONNECTING = 3

const mongoConnection = {
    isConnected: STATUS_DISCONNECTED
}

export const connect = async () => {
    
    if ( mongoConnection.isConnected ) return

    if ( mongoose.connections.length > 0 ) {
        
        mongoConnection.isConnected = mongoose.connections[0].readyState

        if ( mongoConnection.isConnected === STATUS_CONNECTED ) return

        await mongoose.disconnect()

    }

    await mongoose.connect( process.env.MONGO_URL || '' )
    mongoConnection.isConnected = STATUS_CONNECTED

}

export const disconnect = async () => {

    if ( process.env.NODE_ENV === 'development' ) return

    if ( mongoConnection.isConnected === STATUS_DISCONNECTED ) return

    await mongoose.disconnect()
    mongoConnection.isConnected = STATUS_DISCONNECTED

}
