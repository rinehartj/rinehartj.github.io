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
  },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of my projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-3d-portfolio",
          title: "3D portfolio",
          description: "A showcase of my 3D modeling work",
          section: "Navigation",
          handler: () => {
            window.location.href = "/3d-portfolio/";
          },
        },{id: "post-how-to-install-dell-1100-print-drivers-on-windows-11",
        
          title: "How to install Dell 1100 Print Drivers on Windows 11",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/dell1100win11/";
          
        },
      },{id: "post-fixing-an-air-purifier-with-an-obstructed-pm-sensor",
        
          title: "Fixing an air purifier with an obstructed PM sensor",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/airPurifier/";
          
        },
      },{id: "post-raspberry-pi-pico-as-a-hardware-isp",
        
          title: "Raspberry Pi Pico as a hardware ISP",
        
        description: "Created on February 23, 2025",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/hardwareISP/";
          
        },
      },{id: "post-website-updates",
        
          title: "Website Updates",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/webupdates/";
          
        },
      },{id: "3dportfolio-essop-10-package-ic",
          title: 'ESSOP-10 Package IC',
          description: "A small 10-pin IC package.",
          section: "3dportfolio",handler: () => {
              window.location.href = "/3d-portfolio/ESSOP-10-package-IC/";
            },},{id: "3dportfolio-hess-truck-trailer-pivot-replacement-part",
          title: 'HESS Truck Trailer Pivot Replacement Part',
          description: "a 3D-printed replacement part to fix a 1990s-era HESS truck with a broken trailer.",
          section: "3dportfolio",handler: () => {
              window.location.href = "/3d-portfolio/HESS-truck-fix/";
            },},{id: "3dportfolio-piper-cherokee-180-trim-piece",
          title: 'Piper Cherokee 180 Trim Piece',
          description: "This trim piece fits on the bottom floor beam of the Piper Cherokee 180 and similar aircraft.",
          section: "3dportfolio",handler: () => {
              window.location.href = "/3d-portfolio/cherokee-trim-piece/";
            },},{id: "3dportfolio-3d-printable-wall-shelf",
          title: '3D-printable Wall Shelf',
          description: "a 3D-printable wall shelf mounted via adhesive strips",
          section: "3dportfolio",handler: () => {
              window.location.href = "/3d-portfolio/wallshelf-3Dprint/";
            },},{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "projects-custom-built-computer",
          title: 'Custom-Built Computer',
          description: "Allowed smooth handling of resource-intense applications.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/computer/";
            },},{id: "projects-automated-facetime-pickup-system",
          title: 'Automated FaceTime Pickup System',
          description: "A one-button solution to launching a FaceTime call, ideal for seniors.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/facetimelaptop/";
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
            },},{id: "projects-in-ear-wearable-for-blood-oxygen-saturation-monitoring",
          title: 'In-ear Wearable for Blood Oxygen Saturation Monitoring',
          description: "Helps doctors gather data from people with sleep apnea and COPD.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/oximeter/";
            },},{id: "projects-client-server-radar-security-circuit",
          title: 'Client-Server Radar Security Circuit',
          description: "Protects against intruders using 5.8GHz radar and IoT connectivity.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/radarsecurity/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
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
