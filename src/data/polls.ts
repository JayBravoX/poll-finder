import type { PollTopic } from './types';

/**
 * Curated set of real, sourced public-opinion topics. Each topic's `overall` figure and
 * any breakdown marked confidence: 'reported' comes from a cited published survey.
 * Breakdowns marked 'modeled' are illustrative approximations consistent with widely
 * reported patterns for that topic, not exact reproduced crosstabs — real pollsters
 * rarely publish all five of age/gender/country/region/religion for a single question.
 * See each breakdown's `note` for exactly what is and isn't a directly reported figure.
 */
export const POLL_TOPICS: PollTopic[] = [
  {
    id: 'same-sex-marriage',
    query: 'Should marriage be redefined to include same-sex couples, or should the traditional definition be preserved?',
    agreeLabel: 'Marriage laws should be more inclusive (support same-sex marriage)',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Traditional (one man, one woman) definition should be preserved',
    category: 'Social & cultural values',
    keywords: ['marriage', 'same-sex', 'same sex', 'gay marriage', 'traditional marriage', 'progressive', 'wedding', 'lgbt', 'homosexual', 'wed', 'spouse'],
    source: {
      org: 'Gallup',
      title: 'U.S. Same-Sex Marriage Support Holds Near Record High',
      url: 'https://news.gallup.com/poll/506636/sex-marriage-support-holds-high.aspx',
      date: '2023',
      sampleNote: '~1,000 U.S. adults, telephone survey',
    },
    overall: { agree: 71, neutral: 4, disagree: 25 },
    breakdowns: {
      country: {
        confidence: 'modeled',
        note: "Sweden (94%) and Nigeria (7%) are directly reported 2020 figures from Pew's Global Divide on Homosexuality (measuring broad societal acceptance of homosexuality — the closest available global proxy, since same-sex marriage legality itself isn't polled uniformly worldwide). Other countries are illustrative, positioned consistently with that report's regional pattern.",
        groups: [
          { group: 'Sweden', agree: 94, neutral: 2, disagree: 4 },
          { group: 'Spain', agree: 89, neutral: 3, disagree: 8 },
          { group: 'Canada', agree: 85, neutral: 4, disagree: 11 },
          { group: 'United Kingdom', agree: 81, neutral: 5, disagree: 14 },
          { group: 'France', agree: 80, neutral: 5, disagree: 15 },
          { group: 'United States', agree: 72, neutral: 5, disagree: 23 },
          { group: 'Poland', agree: 46, neutral: 8, disagree: 46 },
          { group: 'India', agree: 37, neutral: 10, disagree: 53 },
          { group: 'Kenya', agree: 14, neutral: 6, disagree: 80 },
          { group: 'Nigeria', agree: 7, neutral: 3, disagree: 90 },
        ],
      },
      age: {
        confidence: 'modeled',
        note: 'Approximates the well-documented age gradient in Gallup/Pew tracking polls; exact figures are illustrative.',
        groups: [
          { group: '18-29', agree: 83, neutral: 4, disagree: 13 },
          { group: '30-49', agree: 74, neutral: 4, disagree: 22 },
          { group: '50-64', agree: 65, neutral: 4, disagree: 31 },
          { group: '65+', agree: 56, neutral: 5, disagree: 39 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 74, neutral: 4, disagree: 22 },
          { group: 'Men', agree: 68, neutral: 4, disagree: 28 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 79, neutral: 4, disagree: 17 },
          { group: 'West', agree: 77, neutral: 4, disagree: 19 },
          { group: 'Midwest', agree: 69, neutral: 4, disagree: 27 },
          { group: 'South', agree: 62, neutral: 5, disagree: 33 },
        ],
      },
      religion: {
        confidence: 'modeled',
        note: 'Directionally consistent with PRRI American Values Atlas findings on religion and LGBTQ acceptance; exact figures are illustrative.',
        groups: [
          { group: 'Religiously unaffiliated', agree: 88, neutral: 3, disagree: 9 },
          { group: 'Catholic', agree: 74, neutral: 4, disagree: 22 },
          { group: 'White mainline Protestant', agree: 70, neutral: 4, disagree: 26 },
          { group: 'Black Protestant', agree: 55, neutral: 5, disagree: 40 },
          { group: 'White evangelical Protestant', agree: 38, neutral: 4, disagree: 58 },
        ],
      },
    },
  },
  {
    id: 'animal-rights',
    query: 'Do animals deserve the same rights and protections as people?',
    agreeLabel: 'Animals deserve the same rights as people',
    neutralLabel: 'Some protection, but can still be used for human benefit',
    disagreeLabel: "Little protection needed — they're just animals",
    category: 'Animals & ethics',
    keywords: ['animal', 'animals', 'animals are cute', 'pets', 'pet', 'cute', 'animal rights', 'animal welfare', 'creatures', 'dogs', 'cats'],
    source: {
      org: 'Gallup',
      title: 'In U.S., More Say Animals Should Have Same Rights as People',
      url: 'https://news.gallup.com/poll/183275/say-animals-rights-people.aspx',
      date: '2015',
      sampleNote: '1,015 U.S. adults, telephone survey',
    },
    overall: { agree: 32, neutral: 62, disagree: 6 },
    breakdowns: {
      gender: {
        confidence: 'reported',
        note: 'The "same rights" share (42% women, 22% men) is directly reported. The neutral/disagree split within each gender is estimated proportionally to the national pattern.',
        groups: [
          { group: 'Women', agree: 42, neutral: 54, disagree: 4 },
          { group: 'Men', agree: 22, neutral: 71, disagree: 7 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 40, neutral: 54, disagree: 6 },
          { group: '30-49', agree: 34, neutral: 60, disagree: 6 },
          { group: '50-64', agree: 28, neutral: 65, disagree: 7 },
          { group: '65+', agree: 24, neutral: 68, disagree: 8 },
        ],
      },
      country: {
        confidence: 'modeled',
        note: 'Illustrative — there is no single comparable global tracking poll on this exact question.',
        groups: [
          { group: 'United States', agree: 32, neutral: 62, disagree: 6 },
          { group: 'United Kingdom', agree: 38, neutral: 56, disagree: 6 },
          { group: 'Germany', agree: 35, neutral: 59, disagree: 6 },
          { group: 'India', agree: 29, neutral: 64, disagree: 7 },
          { group: 'Brazil', agree: 41, neutral: 53, disagree: 6 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'West', agree: 36, neutral: 58, disagree: 6 },
          { group: 'Northeast', agree: 34, neutral: 60, disagree: 6 },
          { group: 'Midwest', agree: 30, neutral: 64, disagree: 6 },
          { group: 'South', agree: 28, neutral: 66, disagree: 6 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'Religiously unaffiliated', agree: 40, neutral: 54, disagree: 6 },
          { group: 'Christian', agree: 27, neutral: 67, disagree: 6 },
          { group: 'Other faiths', agree: 33, neutral: 61, disagree: 6 },
        ],
      },
    },
  },
  {
    id: 'death-penalty',
    query: 'Should the death penalty be legal for people convicted of murder?',
    agreeLabel: 'Favor the death penalty',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Oppose the death penalty',
    category: 'Criminal justice',
    keywords: ['death penalty', 'capital punishment', 'execution', 'executed', 'murder sentence', 'death row'],
    source: {
      org: 'Gallup',
      title: 'Death Penalty (annual Crime survey)',
      url: 'https://news.gallup.com/poll/1606/death-penalty.aspx',
      date: '2023',
      sampleNote: '~1,000 U.S. adults, telephone survey',
    },
    overall: { agree: 53, neutral: 3, disagree: 44 },
    breakdowns: {
      age: {
        confidence: 'modeled',
        note: "Modeled from Pew's 2021 demographic patterns (which reported by race and party, not age/gender/country/region); exact figures here are illustrative.",
        groups: [
          { group: '18-29', agree: 44, neutral: 4, disagree: 52 },
          { group: '30-49', agree: 50, neutral: 3, disagree: 47 },
          { group: '50-64', agree: 58, neutral: 3, disagree: 39 },
          { group: '65+', agree: 57, neutral: 3, disagree: 40 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Men', agree: 60, neutral: 3, disagree: 37 },
          { group: 'Women', agree: 47, neutral: 3, disagree: 50 },
        ],
      },
      country: {
        confidence: 'modeled',
        note: 'Illustrative — each country has its own justice-system polling; this is not one shared tracking survey.',
        groups: [
          { group: 'United States', agree: 53, neutral: 3, disagree: 44 },
          { group: 'Japan', agree: 80, neutral: 3, disagree: 17 },
          { group: 'India', agree: 63, neutral: 4, disagree: 33 },
          { group: 'United Kingdom', agree: 33, neutral: 5, disagree: 62 },
          { group: 'Germany', agree: 30, neutral: 5, disagree: 65 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'South', agree: 60, neutral: 3, disagree: 37 },
          { group: 'Midwest', agree: 54, neutral: 3, disagree: 43 },
          { group: 'West', agree: 48, neutral: 3, disagree: 49 },
          { group: 'Northeast', agree: 45, neutral: 3, disagree: 52 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'White evangelical Protestant', agree: 63, neutral: 3, disagree: 34 },
          { group: 'Catholic', agree: 55, neutral: 3, disagree: 42 },
          { group: 'Religiously unaffiliated', agree: 44, neutral: 3, disagree: 53 },
        ],
      },
    },
  },
  {
    id: 'marijuana-legalization',
    query: 'Should the use of marijuana be legal?',
    agreeLabel: 'Marijuana use should be legal',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Marijuana use should not be legal',
    category: 'Drug policy',
    keywords: ['marijuana', 'cannabis', 'weed', 'pot legal', 'legalize weed', 'legalization'],
    source: {
      org: 'Gallup',
      title: 'Grassroots Support for Legalizing Marijuana Hits Record 70%',
      url: 'https://news.gallup.com/poll/514007/grassroots-support-legalizing-marijuana-hits-record.aspx',
      date: '2023',
      sampleNote: '~1,000 U.S. adults, telephone survey',
    },
    overall: { agree: 70, neutral: 3, disagree: 27 },
    breakdowns: {
      age: {
        confidence: 'reported',
        note: '18-34 (79%) and 65+ (64%) are directly reported 2023 Gallup figures; the two middle brackets are interpolated between them.',
        groups: [
          { group: '18-34', agree: 79, neutral: 3, disagree: 18 },
          { group: '35-49', agree: 74, neutral: 3, disagree: 23 },
          { group: '50-64', agree: 68, neutral: 3, disagree: 29 },
          { group: '65+', agree: 64, neutral: 3, disagree: 33 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Men', agree: 72, neutral: 3, disagree: 25 },
          { group: 'Women', agree: 68, neutral: 3, disagree: 29 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'United States', agree: 70, neutral: 3, disagree: 27 },
          { group: 'Canada', agree: 68, neutral: 3, disagree: 29 },
          { group: 'Germany', agree: 55, neutral: 4, disagree: 41 },
          { group: 'Mexico', agree: 48, neutral: 4, disagree: 48 },
          { group: 'Japan', agree: 22, neutral: 5, disagree: 73 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'West', agree: 76, neutral: 3, disagree: 21 },
          { group: 'Northeast', agree: 72, neutral: 3, disagree: 25 },
          { group: 'Midwest', agree: 68, neutral: 3, disagree: 29 },
          { group: 'South', agree: 64, neutral: 3, disagree: 33 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'Religiously unaffiliated', agree: 84, neutral: 2, disagree: 14 },
          { group: 'Catholic', agree: 68, neutral: 3, disagree: 29 },
          { group: 'White mainline Protestant', agree: 65, neutral: 3, disagree: 32 },
          { group: 'White evangelical Protestant', agree: 48, neutral: 4, disagree: 48 },
        ],
      },
    },
  },
  {
    id: 'abortion-legal',
    query: 'Should abortion be legal?',
    agreeLabel: 'Abortion should be legal in all/most cases',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Abortion should be illegal in all/most cases',
    category: 'Reproductive rights',
    keywords: ['abortion', 'pro-choice', 'pro-life', 'roe v wade', 'reproductive rights'],
    source: {
      org: 'Pew Research Center',
      title: "America's Abortion Quandary",
      url: 'https://www.pewresearch.org/religion/2022/05/06/americas-abortion-quandary/',
      date: '2022-2024',
      sampleNote: '~10,000 U.S. adults, online panel',
    },
    overall: { agree: 61, neutral: 2, disagree: 37 },
    breakdowns: {
      religion: {
        confidence: 'reported',
        note: 'Directly reported Pew figures by religious group; the small neutral share is estimated.',
        groups: [
          { group: 'Religiously unaffiliated', agree: 82, neutral: 2, disagree: 16 },
          { group: 'Black Protestant', agree: 68, neutral: 2, disagree: 30 },
          { group: 'White non-evangelical Protestant', agree: 63, neutral: 2, disagree: 35 },
          { group: 'Catholic', agree: 57, neutral: 2, disagree: 41 },
          { group: 'White evangelical Protestant', agree: 26, neutral: 2, disagree: 72 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 74, neutral: 2, disagree: 24 },
          { group: '30-49', agree: 64, neutral: 2, disagree: 34 },
          { group: '50-64', agree: 56, neutral: 2, disagree: 42 },
          { group: '65+', agree: 54, neutral: 2, disagree: 44 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 63, neutral: 2, disagree: 35 },
          { group: 'Men', agree: 59, neutral: 2, disagree: 39 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'United States', agree: 61, neutral: 2, disagree: 37 },
          { group: 'France', agree: 82, neutral: 2, disagree: 16 },
          { group: 'United Kingdom', agree: 74, neutral: 2, disagree: 24 },
          { group: 'Poland', agree: 42, neutral: 3, disagree: 55 },
          { group: 'Brazil', agree: 33, neutral: 3, disagree: 64 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 68, neutral: 2, disagree: 30 },
          { group: 'West', agree: 65, neutral: 2, disagree: 33 },
          { group: 'Midwest', agree: 59, neutral: 2, disagree: 39 },
          { group: 'South', agree: 55, neutral: 2, disagree: 43 },
        ],
      },
    },
  },
  {
    id: 'climate-change-human',
    query: 'Is climate change mainly caused by human activity?',
    agreeLabel: 'Human activity contributes a great deal',
    neutralLabel: 'Contributes some',
    disagreeLabel: 'Contributes not much / not at all',
    category: 'Science & environment',
    keywords: ['climate change', 'global warming', 'human caused', 'carbon emissions', 'fossil fuels'],
    source: {
      org: 'Pew Research Center',
      title: 'How Americans View Climate Change and Policies to Address the Issue',
      url: 'https://www.pewresearch.org/science/2024/12/09/how-americans-view-climate-change-and-policies-to-address-the-issue/',
      date: '2023-2024',
      sampleNote: '~10,000 U.S. adults, online panel',
    },
    overall: { agree: 46, neutral: 29, disagree: 25 },
    breakdowns: {
      age: {
        confidence: 'reported',
        note: '18-29 (59%) and 65+ (38%) are directly reported figures for the "great deal" share; middle brackets are interpolated.',
        groups: [
          { group: '18-29', agree: 59, neutral: 25, disagree: 16 },
          { group: '30-49', agree: 50, neutral: 27, disagree: 23 },
          { group: '50-64', agree: 42, neutral: 30, disagree: 28 },
          { group: '65+', agree: 38, neutral: 31, disagree: 31 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 49, neutral: 28, disagree: 23 },
          { group: 'Men', agree: 43, neutral: 30, disagree: 27 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'Germany', agree: 65, neutral: 20, disagree: 15 },
          { group: 'United Kingdom', agree: 60, neutral: 22, disagree: 18 },
          { group: 'Australia', agree: 58, neutral: 24, disagree: 18 },
          { group: 'India', agree: 55, neutral: 25, disagree: 20 },
          { group: 'United States', agree: 46, neutral: 29, disagree: 25 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'West', agree: 53, neutral: 27, disagree: 20 },
          { group: 'Northeast', agree: 51, neutral: 28, disagree: 21 },
          { group: 'Midwest', agree: 43, neutral: 30, disagree: 27 },
          { group: 'South', agree: 40, neutral: 29, disagree: 31 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'Religiously unaffiliated', agree: 63, neutral: 22, disagree: 15 },
          { group: 'Catholic', agree: 47, neutral: 29, disagree: 24 },
          { group: 'White mainline Protestant', agree: 40, neutral: 31, disagree: 29 },
          { group: 'White evangelical Protestant', agree: 25, neutral: 29, disagree: 46 },
        ],
      },
    },
  },
  {
    id: 'gun-control',
    query: 'Should gun laws in the U.S. be stricter?',
    agreeLabel: 'Gun laws should be stricter',
    neutralLabel: 'About right as they are',
    disagreeLabel: 'Gun laws should be less strict',
    category: 'Public policy',
    keywords: ['gun control', 'gun laws', 'firearm', 'second amendment', 'stricter gun', 'guns'],
    source: {
      org: 'Pew Research Center',
      title: 'Views of U.S. Gun Laws, Impact of Gun Ownership on Safety',
      url: 'https://www.pewresearch.org/politics/2023/06/28/views-of-u-s-gun-laws-impact-of-gun-ownership-on-safety/',
      date: '2023',
      sampleNote: '5,115 U.S. adults, online panel',
    },
    overall: { agree: 58, neutral: 26, disagree: 16 },
    breakdowns: {
      gender: {
        confidence: 'reported',
        note: 'Directly reported 2023 Pew figures.',
        groups: [
          { group: 'Women', agree: 64, neutral: 24, disagree: 12 },
          { group: 'Men', agree: 51, neutral: 28, disagree: 21 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 63, neutral: 23, disagree: 14 },
          { group: '30-49', agree: 57, neutral: 26, disagree: 17 },
          { group: '50-64', agree: 55, neutral: 27, disagree: 18 },
          { group: '65+', agree: 58, neutral: 25, disagree: 17 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'United Kingdom', agree: 78, neutral: 16, disagree: 6 },
          { group: 'Australia', agree: 74, neutral: 18, disagree: 8 },
          { group: 'Canada', agree: 70, neutral: 20, disagree: 10 },
          { group: 'Switzerland', agree: 55, neutral: 28, disagree: 17 },
          { group: 'United States', agree: 58, neutral: 26, disagree: 16 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 66, neutral: 22, disagree: 12 },
          { group: 'West', agree: 60, neutral: 25, disagree: 15 },
          { group: 'Midwest', agree: 55, neutral: 27, disagree: 18 },
          { group: 'South', agree: 51, neutral: 28, disagree: 21 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'Religiously unaffiliated', agree: 68, neutral: 20, disagree: 12 },
          { group: 'Catholic', agree: 60, neutral: 25, disagree: 15 },
          { group: 'White mainline Protestant', agree: 52, neutral: 28, disagree: 20 },
          { group: 'White evangelical Protestant', agree: 42, neutral: 30, disagree: 28 },
        ],
      },
    },
  },
  {
    id: 'aliens-ufo',
    query: 'Does intelligent alien life exist beyond Earth?',
    agreeLabel: 'Believe intelligent life exists on other planets',
    neutralLabel: 'Not sure',
    disagreeLabel: "Don't believe it exists",
    category: 'Science & belief',
    keywords: ['aliens', 'ufo', 'ufos', 'extraterrestrial', 'intelligent life', 'space life'],
    source: {
      org: 'Pew Research Center',
      title: 'Most Americans Believe in Intelligent Life Beyond Earth',
      url: 'https://www.pewresearch.org/short-reads/2021/06/30/most-americans-believe-in-intelligent-life-beyond-earth-few-see-ufos-as-a-major-national-security-threat/',
      date: '2021',
      sampleNote: '10,417 U.S. adults, online panel',
    },
    overall: { agree: 65, neutral: 19, disagree: 16 },
    breakdowns: {
      age: {
        confidence: 'reported',
        note: '18-29 (76%), 30-49 (69%), and 50-64 (58%) are directly reported 2021 Pew figures; 65+ is interpolated consistent with the reported downward trend by age.',
        groups: [
          { group: '18-29', agree: 76, neutral: 14, disagree: 10 },
          { group: '30-49', agree: 69, neutral: 17, disagree: 14 },
          { group: '50-64', agree: 58, neutral: 22, disagree: 20 },
          { group: '65+', agree: 50, neutral: 26, disagree: 24 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Men', agree: 68, neutral: 17, disagree: 15 },
          { group: 'Women', agree: 62, neutral: 21, disagree: 17 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'India', agree: 72, neutral: 16, disagree: 12 },
          { group: 'Brazil', agree: 70, neutral: 16, disagree: 14 },
          { group: 'United States', agree: 65, neutral: 19, disagree: 16 },
          { group: 'United Kingdom', agree: 60, neutral: 22, disagree: 18 },
          { group: 'Japan', agree: 55, neutral: 25, disagree: 20 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'West', agree: 68, neutral: 17, disagree: 15 },
          { group: 'Northeast', agree: 64, neutral: 19, disagree: 17 },
          { group: 'Midwest', agree: 63, neutral: 20, disagree: 17 },
          { group: 'South', agree: 63, neutral: 20, disagree: 17 },
        ],
      },
      religion: {
        confidence: 'modeled',
        note: 'Directionally consistent with the reported Pew finding that religious Americans are less likely to believe in extraterrestrial intelligent life.',
        groups: [
          { group: 'Religiously unaffiliated', agree: 78, neutral: 12, disagree: 10 },
          { group: 'Catholic', agree: 63, neutral: 20, disagree: 17 },
          { group: 'White mainline Protestant', agree: 58, neutral: 22, disagree: 20 },
          { group: 'White evangelical Protestant', agree: 45, neutral: 27, disagree: 28 },
        ],
      },
    },
  },
  {
    id: 'astrology-belief',
    query: 'Do horoscopes and astrology accurately describe personality and predict life events?',
    agreeLabel: 'Believe in astrology',
    neutralLabel: 'Not sure',
    disagreeLabel: "Don't believe in astrology",
    category: 'Beliefs & lifestyle',
    keywords: ['astrology', 'horoscope', 'zodiac', 'star sign', 'tarot'],
    source: {
      org: 'Pew Research Center',
      title: "'New Age' Beliefs Common Among Both Religious and Nonreligious Americans",
      url: 'https://www.pewresearch.org/short-reads/2018/10/01/new-age-beliefs-common-among-both-religious-and-nonreligious-americans/',
      date: '2017-2024',
      sampleNote: '~9,000-10,000 U.S. adults, online panel',
    },
    overall: { agree: 27, neutral: 20, disagree: 53 },
    breakdowns: {
      gender: {
        confidence: 'reported',
        note: 'Directly reported figures (35% women, 18% men).',
        groups: [
          { group: 'Women', agree: 35, neutral: 20, disagree: 45 },
          { group: 'Men', agree: 18, neutral: 20, disagree: 62 },
        ],
      },
      age: {
        confidence: 'reported',
        note: '18-29 (33%) and 65+ (17%) are directly reported figures; middle brackets are interpolated.',
        groups: [
          { group: '18-29', agree: 33, neutral: 20, disagree: 47 },
          { group: '30-49', agree: 30, neutral: 20, disagree: 50 },
          { group: '50-64', agree: 22, neutral: 20, disagree: 58 },
          { group: '65+', agree: 17, neutral: 20, disagree: 63 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'India', agree: 45, neutral: 20, disagree: 35 },
          { group: 'Brazil', agree: 38, neutral: 20, disagree: 42 },
          { group: 'United Kingdom', agree: 30, neutral: 20, disagree: 50 },
          { group: 'United States', agree: 27, neutral: 20, disagree: 53 },
          { group: 'Germany', agree: 24, neutral: 20, disagree: 56 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'South', agree: 29, neutral: 20, disagree: 51 },
          { group: 'West', agree: 28, neutral: 20, disagree: 52 },
          { group: 'Northeast', agree: 27, neutral: 20, disagree: 53 },
          { group: 'Midwest', agree: 24, neutral: 20, disagree: 56 },
        ],
      },
      religion: {
        confidence: 'modeled',
        note: "Pew's research finds religious affiliation is only a small factor in astrology belief; figures here are illustrative and close to the national average.",
        groups: [
          { group: 'Other faiths', agree: 31, neutral: 20, disagree: 49 },
          { group: 'Religiously unaffiliated', agree: 29, neutral: 20, disagree: 51 },
          { group: 'Christian', agree: 26, neutral: 20, disagree: 54 },
        ],
      },
    },
  },
  {
    id: 'healthcare-government-responsibility',
    query: 'Is it the government’s responsibility to ensure all Americans have health care coverage?',
    agreeLabel: "Government should ensure health care coverage",
    neutralLabel: 'No opinion',
    disagreeLabel: "Not the government's responsibility",
    category: 'Public policy',
    keywords: ['healthcare', 'health care', 'universal healthcare', 'government healthcare', 'health insurance', 'medicare for all'],
    source: {
      org: 'Pew Research Center',
      title: 'Most Americans Say Government Has a Responsibility to Ensure Health Care Coverage',
      url: 'https://www.pewresearch.org/short-reads/2025/12/10/most-americans-say-government-has-a-responsibility-to-ensure-health-care-coverage/',
      date: '2024-2025',
      sampleNote: '~5,000 U.S. adults, online panel',
    },
    overall: { agree: 65, neutral: 1, disagree: 34 },
    breakdowns: {
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 70, neutral: 1, disagree: 29 },
          { group: '30-49', agree: 66, neutral: 1, disagree: 33 },
          { group: '50-64', agree: 62, neutral: 1, disagree: 37 },
          { group: '65+', agree: 61, neutral: 1, disagree: 38 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 69, neutral: 1, disagree: 30 },
          { group: 'Men', agree: 60, neutral: 1, disagree: 39 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'United Kingdom', agree: 84, neutral: 1, disagree: 15 },
          { group: 'Canada', agree: 80, neutral: 1, disagree: 19 },
          { group: 'Germany', agree: 78, neutral: 1, disagree: 21 },
          { group: 'United States', agree: 65, neutral: 1, disagree: 34 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 71, neutral: 1, disagree: 28 },
          { group: 'West', agree: 68, neutral: 1, disagree: 31 },
          { group: 'Midwest', agree: 63, neutral: 1, disagree: 36 },
          { group: 'South', agree: 60, neutral: 1, disagree: 39 },
        ],
      },
    },
  },
  {
    id: 'immigration-levels',
    query: 'Should immigration to the U.S. be decreased?',
    agreeLabel: 'Immigration should be decreased',
    neutralLabel: 'Keep at the present level',
    disagreeLabel: 'Immigration should be increased',
    category: 'Public policy',
    keywords: ['immigration', 'immigrants', 'border', 'migrants', 'illegal immigration'],
    source: {
      org: 'Gallup',
      title: 'Sharply More Americans Want to Curb Immigration to U.S.',
      url: 'https://news.gallup.com/poll/647123/sharply-americans-curb-immigration.aspx',
      date: '2023',
      sampleNote: '~1,000 U.S. adults, telephone survey',
    },
    overall: { agree: 40, neutral: 35, disagree: 25 },
    breakdowns: {
      age: {
        confidence: 'modeled',
        note: 'Only the overall "decreased" figure (40%, Feb 2023) is directly reported; the rest of this split is illustrative.',
        groups: [
          { group: '18-29', agree: 27, neutral: 40, disagree: 33 },
          { group: '30-49', agree: 37, neutral: 37, disagree: 26 },
          { group: '50-64', agree: 46, neutral: 32, disagree: 22 },
          { group: '65+', agree: 49, neutral: 31, disagree: 20 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Men', agree: 43, neutral: 33, disagree: 24 },
          { group: 'Women', agree: 37, neutral: 37, disagree: 26 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'South', agree: 46, neutral: 33, disagree: 21 },
          { group: 'Midwest', agree: 41, neutral: 35, disagree: 24 },
          { group: 'Northeast', agree: 33, neutral: 37, disagree: 30 },
          { group: 'West', agree: 36, neutral: 36, disagree: 28 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'White evangelical Protestant', agree: 54, neutral: 30, disagree: 16 },
          { group: 'Catholic', agree: 40, neutral: 35, disagree: 25 },
          { group: 'Religiously unaffiliated', agree: 26, neutral: 38, disagree: 36 },
        ],
      },
    },
  },
  {
    id: 'minimum-wage-15',
    query: 'Should the federal minimum wage be raised to $15 an hour?',
    agreeLabel: 'Favor raising the minimum wage to $15/hour',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Oppose raising it to $15/hour',
    category: 'Economic policy',
    keywords: ['minimum wage', '$15 an hour', 'living wage', 'wage increase'],
    source: {
      org: 'Pew Research Center',
      title: 'Most Americans Support a $15 Federal Minimum Wage',
      url: 'https://www.pewresearch.org/short-reads/2021/04/22/most-americans-support-a-15-federal-minimum-wage/',
      date: '2021',
      sampleNote: '5,109 U.S. adults, online panel',
    },
    overall: { agree: 62, neutral: 1, disagree: 37 },
    breakdowns: {
      gender: {
        confidence: 'reported',
        note: 'Directly reported figures (72% women, 61% men).',
        groups: [
          { group: 'Women', agree: 72, neutral: 1, disagree: 27 },
          { group: 'Men', agree: 61, neutral: 1, disagree: 38 },
        ],
      },
      age: {
        confidence: 'reported',
        note: '18-29 (68%) is directly reported; other brackets are interpolated.',
        groups: [
          { group: '18-29', agree: 68, neutral: 1, disagree: 31 },
          { group: '30-49', agree: 64, neutral: 1, disagree: 35 },
          { group: '50-64', agree: 58, neutral: 1, disagree: 41 },
          { group: '65+', agree: 55, neutral: 1, disagree: 44 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'United Kingdom', agree: 66, neutral: 2, disagree: 32 },
          { group: 'Canada', agree: 63, neutral: 2, disagree: 35 },
          { group: 'United States', agree: 62, neutral: 1, disagree: 37 },
          { group: 'Germany', agree: 58, neutral: 2, disagree: 40 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 69, neutral: 1, disagree: 30 },
          { group: 'West', agree: 66, neutral: 1, disagree: 33 },
          { group: 'Midwest', agree: 59, neutral: 1, disagree: 40 },
          { group: 'South', agree: 57, neutral: 1, disagree: 42 },
        ],
      },
    },
  },
  {
    id: 'belief-in-god',
    query: 'Do you believe in God?',
    agreeLabel: 'Believe in God',
    neutralLabel: 'Unsure',
    disagreeLabel: "Don't believe in God",
    category: 'Beliefs & lifestyle',
    keywords: ['believe in god', 'belief in god', 'god exists', 'atheism', 'atheist', 'religious belief'],
    source: {
      org: 'Gallup',
      title: 'Belief in Five Spiritual Entities Edges Down to New Lows',
      url: 'https://news.gallup.com/poll/508886/belief-five-spiritual-entities-edges-down-new-lows.aspx',
      date: '2023',
      sampleNote: '~800-1,000 U.S. adults, telephone survey',
    },
    overall: { agree: 74, neutral: 6, disagree: 20 },
    breakdowns: {
      age: {
        confidence: 'reported',
        note: '18-34 (59%) is directly reported for 2023; other brackets are interpolated to match the reported overall of 74%.',
        groups: [
          { group: '18-34', agree: 59, neutral: 9, disagree: 32 },
          { group: '35-54', agree: 74, neutral: 6, disagree: 20 },
          { group: '55-64', agree: 84, neutral: 4, disagree: 12 },
          { group: '65+', agree: 89, neutral: 3, disagree: 8 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 79, neutral: 5, disagree: 16 },
          { group: 'Men', agree: 68, neutral: 7, disagree: 25 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'Nigeria', agree: 99, neutral: 1, disagree: 0 },
          { group: 'India', agree: 96, neutral: 2, disagree: 2 },
          { group: 'Brazil', agree: 90, neutral: 4, disagree: 6 },
          { group: 'United States', agree: 74, neutral: 6, disagree: 20 },
          { group: 'United Kingdom', agree: 45, neutral: 15, disagree: 40 },
          { group: 'Sweden', agree: 25, neutral: 15, disagree: 60 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'South', agree: 82, neutral: 5, disagree: 13 },
          { group: 'Midwest', agree: 75, neutral: 6, disagree: 19 },
          { group: 'West', agree: 66, neutral: 7, disagree: 27 },
          { group: 'Northeast', agree: 68, neutral: 7, disagree: 25 },
        ],
      },
    },
  },
];
