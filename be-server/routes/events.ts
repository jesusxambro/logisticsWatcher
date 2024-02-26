import { Router, Response, Request } from "express";


const router = Router();


router.get('/events', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  
    const sendEvent = (data: object) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };
  
    const intervalId = setInterval(() => {
      sendEvent({ message: 'Hello from server', timestamp: new Date().toISOString() });
    }, 10000);
  
    req.on('close', () => {
      console.log('Client closed connection');
      clearInterval(intervalId);
      res.end();
    });
  });
  
  export default router;