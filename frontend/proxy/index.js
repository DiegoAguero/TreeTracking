const express = require('express');
const app = express();
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT ?? 3000;
const targetEndPoint = process.env.PORT_TARGET_LOCAL;
app.use(cors());
app.get('/', createProxyMiddleware({ target:targetEndPoint , changeOrigin: true}));
app.listen(port, ()=>{
  console.log(`listening on port http://localhost:${port}`);
});
