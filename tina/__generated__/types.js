export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PostPartsFragmentDoc = gql`
    fragment PostParts on Post {
  __typename
  title
  excerpt
  featuredImage
  date
  category
  tags
  author
  companionSlug
  linkedInUrl
  featured
  body
  spanishTitle
  spanishExcerpt
  spanishContent
  catalanTitle
  catalanExcerpt
  catalanContent
}
    `;
export const AuthorPartsFragmentDoc = gql`
    fragment AuthorParts on Author {
  __typename
  name
  role
  initials
  color
  photo
  linkedInUrl
  bio
  body
}
    `;
export const HomePagePartsFragmentDoc = gql`
    fragment HomePageParts on HomePage {
  __typename
  heroBadgeText
  heroHeadline
  heroHeadlineAccent
  heroSubtext
  heroPrimaryButtonText
  heroPrimaryButtonHref
  heroSecondaryButtonText
  heroSecondaryButtonHref
  startHereLabel
  startHereHeading
  startHereCards {
    __typename
    label
    description
    href
    colorClass
  }
  featuredSectionLabel
  featuredSectionHeading
  postTypesSectionLabel
  postTypesSectionHeading
  postTypeCards {
    __typename
    label
    description
    href
    className
  }
  foundersSectionLabel
  foundersSectionHeading
  foundersSectionText
  foundersButtonText
  foundersButtonHref
  latestSectionLabel
  latestSectionHeading
  latestSectionText
  followSectionLabel
  followSectionHeading
  followSectionText
  followButtonText
}
    `;
export const AboutPagePartsFragmentDoc = gql`
    fragment AboutPageParts on AboutPage {
  __typename
  seoTitle
  seoDescription
  sectionLabel
  headline
  headlineAccent
  intro
  pointOfViewLabel
  pointOfViewText
  primaryButtonText
  primaryButtonHref
  secondaryButtonText
  peopleSectionLabel
  peopleSectionHeading
  body
}
    `;
export const SiteSettingsPartsFragmentDoc = gql`
    fragment SiteSettingsParts on SiteSettings {
  __typename
  siteName
  siteTagline
  linkedInUrl
  betaBadge
  navItems {
    __typename
    label
    href
  }
  siteMetaTitle
  siteMetaDescription
}
    `;
export const NewsletterCtaPartsFragmentDoc = gql`
    fragment NewsletterCTAParts on NewsletterCTA {
  __typename
  badgeText
  headline
  subtext
  emailPlaceholder
  buttonText
  successMessage
  linkedInNudge
}
    `;
export const FooterPartsFragmentDoc = gql`
    fragment FooterParts on Footer {
  __typename
  brandTagline
  staySectionLabel
  staySectionText
  linkedInButtonText
  copyrightSuffix
  builtByLine
}
    `;
export const PostDocument = gql`
    query post($relativePath: String!) {
  post(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PostParts
  }
}
    ${PostPartsFragmentDoc}`;
export const PostConnectionDocument = gql`
    query postConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PostFilter) {
  postConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PostParts
      }
    }
  }
}
    ${PostPartsFragmentDoc}`;
export const AuthorDocument = gql`
    query author($relativePath: String!) {
  author(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AuthorParts
  }
}
    ${AuthorPartsFragmentDoc}`;
export const AuthorConnectionDocument = gql`
    query authorConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AuthorFilter) {
  authorConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AuthorParts
      }
    }
  }
}
    ${AuthorPartsFragmentDoc}`;
export const HomePageDocument = gql`
    query homePage($relativePath: String!) {
  homePage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomePageParts
  }
}
    ${HomePagePartsFragmentDoc}`;
export const HomePageConnectionDocument = gql`
    query homePageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomePageFilter) {
  homePageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomePageParts
      }
    }
  }
}
    ${HomePagePartsFragmentDoc}`;
export const AboutPageDocument = gql`
    query aboutPage($relativePath: String!) {
  aboutPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutPageParts
  }
}
    ${AboutPagePartsFragmentDoc}`;
export const AboutPageConnectionDocument = gql`
    query aboutPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutPageFilter) {
  aboutPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutPageParts
      }
    }
  }
}
    ${AboutPagePartsFragmentDoc}`;
export const SiteSettingsDocument = gql`
    query siteSettings($relativePath: String!) {
  siteSettings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SiteSettingsParts
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const SiteSettingsConnectionDocument = gql`
    query siteSettingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SiteSettingsFilter) {
  siteSettingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SiteSettingsParts
      }
    }
  }
}
    ${SiteSettingsPartsFragmentDoc}`;
export const NewsletterCtaDocument = gql`
    query newsletterCTA($relativePath: String!) {
  newsletterCTA(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...NewsletterCTAParts
  }
}
    ${NewsletterCtaPartsFragmentDoc}`;
export const NewsletterCtaConnectionDocument = gql`
    query newsletterCTAConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: NewsletterCTAFilter) {
  newsletterCTAConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...NewsletterCTAParts
      }
    }
  }
}
    ${NewsletterCtaPartsFragmentDoc}`;
export const FooterDocument = gql`
    query footer($relativePath: String!) {
  footer(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FooterParts
  }
}
    ${FooterPartsFragmentDoc}`;
export const FooterConnectionDocument = gql`
    query footerConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FooterFilter) {
  footerConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FooterParts
      }
    }
  }
}
    ${FooterPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    post(variables, options) {
      return requester(PostDocument, variables, options);
    },
    postConnection(variables, options) {
      return requester(PostConnectionDocument, variables, options);
    },
    author(variables, options) {
      return requester(AuthorDocument, variables, options);
    },
    authorConnection(variables, options) {
      return requester(AuthorConnectionDocument, variables, options);
    },
    homePage(variables, options) {
      return requester(HomePageDocument, variables, options);
    },
    homePageConnection(variables, options) {
      return requester(HomePageConnectionDocument, variables, options);
    },
    aboutPage(variables, options) {
      return requester(AboutPageDocument, variables, options);
    },
    aboutPageConnection(variables, options) {
      return requester(AboutPageConnectionDocument, variables, options);
    },
    siteSettings(variables, options) {
      return requester(SiteSettingsDocument, variables, options);
    },
    siteSettingsConnection(variables, options) {
      return requester(SiteSettingsConnectionDocument, variables, options);
    },
    newsletterCTA(variables, options) {
      return requester(NewsletterCtaDocument, variables, options);
    },
    newsletterCTAConnection(variables, options) {
      return requester(NewsletterCtaConnectionDocument, variables, options);
    },
    footer(variables, options) {
      return requester(FooterDocument, variables, options);
    },
    footerConnection(variables, options) {
      return requester(FooterConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/4.1/content/fac6595b-2e7b-4153-a09f-dbaf61a38144/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
