import express,{Request,Response} from "express";
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import config from "./config";
import morganMiddleware from "./middleware/morgan-middleware";
import errorHandler from "./middleware/error-handler";




const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://sub.yourdomain.com",
    "https://anotherdomain.com"
  ];
  


  const corsOptions = {
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // ✅ Allow cookies & Authorization headers
    optionsSuccessStatus: 204,
  };
 
  
export const createServer=()=>{  
      
    const app=express();
    app.disable('x-powered-by')
    .use(morganMiddleware)
    .use(helmet())
    .use(cors(corsOptions))
    .use(express.json())
    .use(express.urlencoded({extended:true}))
    .use(cookieParser())

    // server health check route
    app.get("/health",(req:Request,res:Response)=>{
        res.status(200).json({ok:true,environment:config.env})
    })
    
    // actual routes
    // app.use('/api',api)

    // error handler global middleware
    app.use(errorHandler)
    return app
}