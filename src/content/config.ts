// 1. Import utilities from `astro:content`
import { z, defineCollection, reference } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const pagesCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      featuredImg: z
        .object({
          image: image(),
          alt: z.string(),
        })
        .optional(),
      hero: z
        .object({
          heading: z.string().optional(),
          byline: z.string().optional(),
          shadow: z.boolean().optional(),
          fullWidth: z.boolean().optional(),
          duotone: z.boolean().optional(),
          background: z
            .enum(['primary', 'secondary', 'default', 'dark'])
            .optional(),
          img: image(),
          imgAlt: z.string(),
          textOnly: z.boolean().optional(),
          showLogo: z.boolean().optional(),
          linkText: z.string().optional(),
          linkStyle: z.string().optional(),
          linkTarget: z.string().optional(),
          textPosition: z.string().optional(),
          imgSize: z.string().optional(),

          textStyle: z.string().optional(),
        })
        .optional(),
      showcase: z
        .object({
          heading: z.string().optional(),
          layout: z.string().optional(),
          items: z.number().optional(),
        })
        .optional(),
      iconGridCTA: z
        .object({
          title: z.string().optional(),
          byline: z.string().optional(),
          layout: z.enum(['horizontal', 'vertical']).optional(),
          shape: z.enum(['rounded', 'square']).optional(),
          border: z.boolean().optional(),
          link: z.string().optional(),
          icons: z
            .object({
              one: z.string().optional(),
              two: z.string().optional(),
              three: z.string().optional(),
            })
            .optional(),
        })
        .optional(),
      withImageCTA: z
        .array(
          z.object({
            title: z.string().optional(),
            byline: z.string().optional(),
            layout: z.enum(['horizontal', 'vertical']).optional(),
            shape: z.enum(['rounded', 'square']).optional(),
            border: z.boolean().optional(),
            image: z.string().optional(),
            background: z
              .enum(['primary', 'secondary', 'default', 'dark'])
              .optional(),
            link: z.string().optional(),
          })
        )
        .optional(),
      withIconCTA: z
        .array(
          z.object({
            title: z.string().optional(),
            byline: z.string().optional(),
            layout: z.enum(['horizontal', 'vertical']).optional(),
            iconShape: z.enum(['rounded', 'square']).optional(),
            icon: z.string().optional(),
            background: z
              .enum(['primary', 'secondary', 'default', 'dark'])
              .optional(),
            link: z.string().optional(),
          })
        )
        .optional(),
      quote: z
        .object({
          text: z.string().optional(),
          citation: z.string().optional(),
          weight: z.enum(['light', 'medium', 'heavy']).optional(),
          style: z.enum(['normal', 'capital', 'upper']).optional(),
          iconColor: z.enum(['primary', 'secondary', 'tertiary']).optional(),
        })
        .optional(),
      basicCTA: z
        .object({
          heading: z.string().optional(),
          byline: z.string().optional(),
          layout: z.enum(['default', 'reverse']).optional(),
          shadow: z.boolean().optional(),
          imgContain: z.boolean().optional(),
          img: image().optional(),
          imgAlt: z.string().optional(),
          linkText: z.string().optional(),
          linkStyle: z.string().optional(),
          linkTarget: z.string().optional(),
        })
        .optional(),
    }),
});

const servicesCollection = defineCollection({
  type: 'data', // v2.5.0 and later
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
      services: z.array(z.string()).optional(),
      image: image().optional(),
      alt: z.string().optional(),
      featured: z.boolean().optional(),
    }),
});

const peopleCollection = defineCollection({
  type: 'data', // v2.5.0 and later
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      biography: z.string(),
      title: z.string(),
      photo: z.object({
        image: image(),
        alt: z.string(),
      }),
      socialLinks: z
        .array(
          z.object({
            title: z.string().optional(),
            url: z.string().optional(),
            icon: z.string().optional(),
          })
        )
        .optional(),
      order: z.number().default(1),
    }),
});

const mainNavCollection = defineCollection({
  type: 'data', // v2.5.0 and later
  schema: () =>
    z.object({
      title: z.string(),
      link: z.string(),
      order: z.number(),
    }),
});

const settingsCollection = defineCollection({
  type: 'data', // v2.5.0 and later
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      byline: z.string(),
      logoSVG: z.string(),
      socialImage: z
        .object({
          image: image(),
          alt: z.string(),
        })
        .optional(),
      socialLinks: z
        .array(
          z.object({ title: z.string(), url: z.string(), icon: z.string() })
        )
        .optional(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  pages: pagesCollection,
  services: servicesCollection,
  people: peopleCollection,
  navigation: mainNavCollection,
  settings: settingsCollection,
};
