import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import User from "@models/user";
import { connectToDB } from "@utils/database";

//next-auth.js.org/getting-started
//console.cloud.google.com
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    //make sure we always know which user is currently online
    //updating the id
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      //every next.js route is a serverless route (lambda) -> only runs when its called -> server doesn't have to be kept running constantly (see database.js to hook up to db)
      try {
        await connectToDB();

        //check if a user already exists
        const userExists = await User.findOne({
          email: profile.email
        });

        //if not, create a new user
        //create a model
        if(!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture
          })
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
})

//usually just as GET or as POST
export { handler as GET, handler as POST }
