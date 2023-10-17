import {withAuth} from 'next-auth/middleware';

//This is a file that defines the middleware that will be run before every request.


//withAuth currently works only with jwt tokens. We are using them so ok. The file middleware.ts, when in the root of the projects helps to prevent paths to be accessed by non-signed-in Users. withAuth uses the session created by next-auth to check if the user is logged in or not, and in this case, if he's not logged in it redirects him to the route page.

export default withAuth({
   pages:{
      signIn:"/"
   },
})

//we protect all the paths inside users. The matcher, in middleware.ts allows you to filter Middleware to run on specific paths
export const config = {
   matcher:[
      "/users/:path*"
   ]
}