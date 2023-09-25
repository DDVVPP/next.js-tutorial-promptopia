import Feed from "@components/Feed"

//using tailwind: tailwindcss.com and search for w-full for eg.
const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
      {/* head_text: anything with underscore means it's our own style */}
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden'/>
        <span className='orange_gradient text-center'>AI-Powered Prompts</span>
      </h1>
      <p className='desc text-center'>
        Prompotopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>

      <Feed/>
    </section>
  )
}

export default Home
