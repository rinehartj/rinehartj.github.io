// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of my projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "post-website-updates",
      
        title: "Website Updates",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/webupdates/";
        
      },
    },{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-custom-built-computer",
          title: 'Custom-Built Computer',
          description: "Allowed smooth handling of resource-intense applications.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/computer/";
            },},{id: "projects-hexacopter-drone",
          title: 'Hexacopter Drone',
          description: "6 arms, 11.52kg motor thrust",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hexacopter/";
            },},{id: "projects-led-lightshow-circuit",
          title: 'LED Lightshow Circuit',
          description: "A custom LED controller for off-the-shelf LED strips.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/lightshow/";
            },},{id: "projects-in-ear-pulse-oximeter",
          title: 'In-Ear Pulse Oximeter',
          description: "Helps doctors gather data from people with sleep apnea and COPD.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/oximeter/";
            },},{id: "projects-client-server-radar-security-circuit",
          title: 'Client-Server Radar Security Circuit',
          description: "Protects against intruders using 5.8GHz radar and IoT connectivity.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/radarsecurity/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%72%69%6E%65%68%61%72%74%6A%31@%6F%75%74%6C%6F%6F%6B.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/rinehartj", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/jasonrinehart", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=epgtHK4AAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
