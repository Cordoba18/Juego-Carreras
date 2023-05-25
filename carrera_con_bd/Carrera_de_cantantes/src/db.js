
import {connect} from "mongoose";
import {MONGOOB_URL} from './config'
export const connectDB = async () => {

    try {
        await connect(MONGOOB_URL)
        console.log("Conectado")
    } catch (error) {
        console.log(error)
        
    }
}