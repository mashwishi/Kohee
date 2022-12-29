import { withEdgeMiddlewareAuth } from "@clerk/nextjs/edge-middleware";
import { NextResponse } from 'next/server'

export default withEdgeMiddlewareAuth(async req => {
  const { userId, sessionId, getToken } = req.auth;
  // Run your middleware

  //console.log(`req: `, req.cookies.get("__session"))

  // Complete response
  return NextResponse.next();
});