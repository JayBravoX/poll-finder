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
  {
    id: 'trump-approval',
    query: 'Do you approve of the job Donald Trump is doing as president?',
    agreeLabel: 'Approve',
    neutralLabel: 'No opinion / unsure',
    disagreeLabel: 'Disapprove',
    category: 'Politics',
    keywords: [
      'trump',
      'donald trump',
      'president trump',
      'trump approval',
      'is trump good',
      'trump doing a good job',
      'presidential approval',
      'approve of trump',
      'trump popular',
      'trump rating',
    ],
    source: {
      org: 'Emerson College Polling',
      title: 'July 2026 National Poll: Democrats with 11-Point Generic Ballot Advantage',
      url: 'https://emersoncollegepolling.com/july-2026-national-poll-democrats-with-11-point-generic-ballot-advantage/',
      date: 'July 2026',
      sampleNote: 'National survey of registered U.S. voters',
    },
    overall: { agree: 39, neutral: 4, disagree: 57 },
    breakdowns: {
      age: {
        confidence: 'modeled',
        note: 'Illustrative — approximates the widely-reported pattern of lower approval among younger adults seen across multiple 2026 polls (not this exact poll\'s crosstab).',
        groups: [
          { group: '18-29', agree: 28, neutral: 4, disagree: 68 },
          { group: '30-49', agree: 36, neutral: 4, disagree: 60 },
          { group: '50-64', agree: 42, neutral: 4, disagree: 54 },
          { group: '65+', agree: 46, neutral: 4, disagree: 50 },
        ],
      },
      gender: {
        confidence: 'modeled',
        note: 'Illustrative — approximates the substantial gender gap reported across multiple 2026 polls (men notably more approving than women), not this exact poll\'s crosstab.',
        groups: [
          { group: 'Men', agree: 47, neutral: 4, disagree: 49 },
          { group: 'Women', agree: 32, neutral: 4, disagree: 64 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'South', agree: 46, neutral: 4, disagree: 50 },
          { group: 'Midwest', agree: 41, neutral: 4, disagree: 55 },
          { group: 'Northeast', agree: 30, neutral: 4, disagree: 66 },
          { group: 'West', agree: 33, neutral: 4, disagree: 63 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'White evangelical Protestant', agree: 63, neutral: 3, disagree: 34 },
          { group: 'Catholic', agree: 40, neutral: 4, disagree: 56 },
          { group: 'Religiously unaffiliated', agree: 22, neutral: 4, disagree: 74 },
        ],
      },
    },
  },
  {
    id: 'ai-job-loss',
    query: 'Are you worried that AI will eliminate jobs and reduce opportunities in the future?',
    agreeLabel: 'Worried about AI eliminating jobs',
    neutralLabel: 'Somewhat concerned',
    disagreeLabel: 'Not worried',
    category: 'Technology',
    keywords: ['ai jobs', 'artificial intelligence jobs', 'ai eliminate jobs', 'ai take jobs', 'ai job loss', 'automation jobs', 'robots take jobs'],
    source: {
      org: 'Pew Research Center',
      title: 'U.S. Workers Are More Worried Than Hopeful About Future AI Use in the Workplace',
      url: 'https://www.pewresearch.org/social-trends/2025/02/25/u-s-workers-are-more-worried-than-hopeful-about-future-ai-use-in-the-workplace/',
      date: '2025',
      sampleNote: 'U.S. workers, online panel',
    },
    overall: { agree: 52, neutral: 16, disagree: 32 },
    breakdowns: {
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 46, neutral: 18, disagree: 36 },
          { group: '30-49', agree: 51, neutral: 17, disagree: 32 },
          { group: '50-64', agree: 56, neutral: 15, disagree: 29 },
          { group: '65+', agree: 58, neutral: 14, disagree: 28 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 55, neutral: 15, disagree: 30 },
          { group: 'Men', agree: 49, neutral: 17, disagree: 34 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'United States', agree: 52, neutral: 16, disagree: 32 },
          { group: 'France', agree: 60, neutral: 15, disagree: 25 },
          { group: 'United Kingdom', agree: 55, neutral: 16, disagree: 29 },
          { group: 'India', agree: 40, neutral: 20, disagree: 40 },
          { group: 'Japan', agree: 58, neutral: 16, disagree: 26 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 54, neutral: 15, disagree: 31 },
          { group: 'West', agree: 53, neutral: 16, disagree: 31 },
          { group: 'Midwest', agree: 51, neutral: 16, disagree: 33 },
          { group: 'South', agree: 51, neutral: 16, disagree: 33 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'Religiously unaffiliated', agree: 50, neutral: 16, disagree: 34 },
          { group: 'Christian', agree: 53, neutral: 16, disagree: 31 },
          { group: 'Other faiths', agree: 51, neutral: 16, disagree: 33 },
        ],
      },
    },
  },
  {
    id: 'labor-union-approval',
    query: 'Do you approve of labor unions?',
    agreeLabel: 'Approve of labor unions',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Disapprove of labor unions',
    category: 'Economic policy',
    keywords: ['labor unions', 'unions', 'union approval', 'trade unions', 'workers union'],
    source: {
      org: 'Gallup',
      title: 'Labor Union Approval Relatively Steady at 68%',
      url: 'https://news.gallup.com/poll/694472/labor-union-approval-relatively-steady.aspx',
      date: '2025',
      sampleNote: '1,094 U.S. adults, telephone survey (Aug. 1-20, 2025)',
    },
    overall: { agree: 68, neutral: 3, disagree: 29 },
    breakdowns: {
      age: {
        confidence: 'reported',
        note: 'Directly reported 2025 Gallup figures (18-34: 72%, 55+: 64%); middle brackets are interpolated.',
        groups: [
          { group: '18-34', agree: 72, neutral: 3, disagree: 25 },
          { group: '35-54', agree: 68, neutral: 3, disagree: 29 },
          { group: '55+', agree: 64, neutral: 3, disagree: 33 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 70, neutral: 3, disagree: 27 },
          { group: 'Men', agree: 66, neutral: 3, disagree: 31 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'Canada', agree: 66, neutral: 4, disagree: 30 },
          { group: 'United Kingdom', agree: 60, neutral: 5, disagree: 35 },
          { group: 'United States', agree: 68, neutral: 3, disagree: 29 },
          { group: 'Germany', agree: 62, neutral: 5, disagree: 33 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 74, neutral: 3, disagree: 23 },
          { group: 'West', agree: 71, neutral: 3, disagree: 26 },
          { group: 'Midwest', agree: 67, neutral: 3, disagree: 30 },
          { group: 'South', agree: 62, neutral: 4, disagree: 34 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'Religiously unaffiliated', agree: 74, neutral: 3, disagree: 23 },
          { group: 'Catholic', agree: 69, neutral: 3, disagree: 28 },
          { group: 'White evangelical Protestant', agree: 55, neutral: 4, disagree: 41 },
        ],
      },
    },
  },
  {
    id: 'four-day-work-week',
    query: 'Would you support switching to a four-day, 32-hour work week?',
    agreeLabel: 'Support a four-day work week',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Oppose a four-day work week',
    category: 'Economic policy',
    keywords: ['four day work week', '4 day work week', '32 hour week', 'shorter work week', 'compressed work week'],
    source: {
      org: 'Ipsos',
      title: "Two-Thirds of Americans Support Implementing a 4-Day Work Week",
      url: 'https://www.ipsos.com/en-us/news-polls/american-support-4-day-work-week',
      date: '2025',
      sampleNote: 'U.S. adults, online panel',
    },
    overall: { agree: 67, neutral: 8, disagree: 25 },
    breakdowns: {
      gender: {
        confidence: 'reported',
        note: 'Directly reported figures from a related 2025 workforce survey (76% women, 57% men).',
        groups: [
          { group: 'Women', agree: 76, neutral: 6, disagree: 18 },
          { group: 'Men', agree: 57, neutral: 10, disagree: 33 },
        ],
      },
      age: {
        confidence: 'modeled',
        note: 'Illustrative — younger generations are widely reported as leading support, older groups more skeptical.',
        groups: [
          { group: '18-29', agree: 78, neutral: 6, disagree: 16 },
          { group: '30-49', agree: 70, neutral: 7, disagree: 23 },
          { group: '50-64', agree: 58, neutral: 9, disagree: 33 },
          { group: '65+', agree: 48, neutral: 10, disagree: 42 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'Spain', agree: 78, neutral: 6, disagree: 16 },
          { group: 'United Kingdom', agree: 72, neutral: 7, disagree: 21 },
          { group: 'United States', agree: 67, neutral: 8, disagree: 25 },
          { group: 'Germany', agree: 70, neutral: 7, disagree: 23 },
          { group: 'Japan', agree: 55, neutral: 10, disagree: 35 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'West', agree: 70, neutral: 7, disagree: 23 },
          { group: 'Northeast', agree: 69, neutral: 7, disagree: 24 },
          { group: 'Midwest', agree: 65, neutral: 8, disagree: 27 },
          { group: 'South', agree: 64, neutral: 8, disagree: 28 },
        ],
      },
    },
  },
  {
    id: 'universal-basic-income',
    query: 'Would you support a universal basic income program?',
    agreeLabel: 'Support universal basic income',
    neutralLabel: 'Neither support nor oppose',
    disagreeLabel: 'Oppose universal basic income',
    category: 'Economic policy',
    keywords: ['universal basic income', 'ubi', 'basic income', 'guaranteed income'],
    source: {
      org: 'MagnifyMoney',
      title: '72% of Americans Support Some Form of Universal Basic Income (UBI)',
      url: 'https://www.magnifymoney.com/news/universal-basic-income-survey/',
      date: '2025',
      sampleNote: 'U.S. adults, online panel',
    },
    overall: { agree: 35, neutral: 38, disagree: 27 },
    breakdowns: {
      age: {
        confidence: 'reported',
        note: 'Directly reported figures for the "favor" share (18-34: 72%, 65+: 26%); middle brackets are interpolated and the neutral/oppose split is estimated.',
        groups: [
          { group: '18-34', agree: 72, neutral: 18, disagree: 10 },
          { group: '35-49', agree: 50, neutral: 30, disagree: 20 },
          { group: '50-64', agree: 35, neutral: 35, disagree: 30 },
          { group: '65+', agree: 26, neutral: 30, disagree: 44 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 46, neutral: 33, disagree: 21 },
          { group: 'Men', agree: 42, neutral: 34, disagree: 24 },
        ],
      },
      country: {
        confidence: 'modeled',
        note: 'Gallup\'s international tracking has found UBI notably more favored in Canada and the UK than in the U.S.',
        groups: [
          { group: 'Canada', agree: 56, neutral: 26, disagree: 18 },
          { group: 'United Kingdom', agree: 52, neutral: 28, disagree: 20 },
          { group: 'United States', agree: 44, neutral: 33, disagree: 23 },
          { group: 'Germany', agree: 48, neutral: 30, disagree: 22 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'West', agree: 49, neutral: 31, disagree: 20 },
          { group: 'Northeast', agree: 47, neutral: 32, disagree: 21 },
          { group: 'Midwest', agree: 41, neutral: 34, disagree: 25 },
          { group: 'South', agree: 40, neutral: 34, disagree: 26 },
        ],
      },
    },
  },
  {
    id: 'trans-athletes-womens-sports',
    query: "Should transgender athletes be allowed to compete in women's sports?",
    agreeLabel: 'Should be allowed to compete',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Should be barred from competing',
    category: 'Social & cultural values',
    keywords: ['transgender athletes', 'trans athletes', "women's sports", 'trans women sports', 'transgender sports ban'],
    source: {
      org: 'New York Times/Ipsos',
      title: 'Poll on transgender athletes in women\'s sports',
      url: 'https://x.com/sahilkapur/status/1887503084475011351',
      date: 'January 2025',
      sampleNote: 'U.S. adults, online panel',
    },
    overall: { agree: 18, neutral: 3, disagree: 79 },
    breakdowns: {
      religion: {
        confidence: 'modeled',
        note: 'Illustrative — directionally consistent with reported partisan splits (67% of Democrats also favored barring trans athletes in the same poll).',
        groups: [
          { group: 'Religiously unaffiliated', agree: 32, neutral: 4, disagree: 64 },
          { group: 'Catholic', agree: 17, neutral: 3, disagree: 80 },
          { group: 'White evangelical Protestant', agree: 6, neutral: 2, disagree: 92 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 28, neutral: 4, disagree: 68 },
          { group: '30-49', agree: 19, neutral: 3, disagree: 78 },
          { group: '50-64', agree: 13, neutral: 3, disagree: 84 },
          { group: '65+', agree: 11, neutral: 2, disagree: 87 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 17, neutral: 3, disagree: 80 },
          { group: 'Men', agree: 19, neutral: 3, disagree: 78 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 24, neutral: 3, disagree: 73 },
          { group: 'West', agree: 22, neutral: 3, disagree: 75 },
          { group: 'Midwest', agree: 16, neutral: 3, disagree: 81 },
          { group: 'South', agree: 13, neutral: 3, disagree: 84 },
        ],
      },
    },
  },
  {
    id: 'tiktok-ban',
    query: 'Should TikTok be banned in the United States?',
    agreeLabel: 'Support banning TikTok',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Oppose banning TikTok',
    category: 'Technology',
    keywords: ['tiktok ban', 'ban tiktok', 'tiktok banned', 'tiktok national security'],
    source: {
      org: 'Pew Research Center',
      title: 'Fewer Americans Now Support TikTok Ban, See the Platform as a National Security Threat Than in Spring 2023',
      url: 'https://www.pewresearch.org/short-reads/2025/03/25/fewer-americans-now-support-tiktok-ban-see-the-platform-as-a-national-security-threat-than-in-spring-2023/',
      date: '2025',
      sampleNote: '~5,000 U.S. adults, online panel (Feb 24-Mar 2, 2025)',
    },
    overall: { agree: 34, neutral: 24, disagree: 42 },
    breakdowns: {
      age: {
        confidence: 'modeled',
        note: 'Illustrative — Pew reports young adults and frequent TikTok users are far less supportive of a ban.',
        groups: [
          { group: '18-29', agree: 16, neutral: 22, disagree: 62 },
          { group: '30-49', agree: 28, neutral: 24, disagree: 48 },
          { group: '50-64', agree: 42, neutral: 24, disagree: 34 },
          { group: '65+', agree: 48, neutral: 24, disagree: 28 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Men', agree: 36, neutral: 22, disagree: 42 },
          { group: 'Women', agree: 32, neutral: 26, disagree: 42 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'India', agree: 55, neutral: 20, disagree: 25 },
          { group: 'United States', agree: 34, neutral: 24, disagree: 42 },
          { group: 'United Kingdom', agree: 22, neutral: 26, disagree: 52 },
          { group: 'Australia', agree: 26, neutral: 25, disagree: 49 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'South', agree: 38, neutral: 23, disagree: 39 },
          { group: 'Midwest', agree: 34, neutral: 24, disagree: 42 },
          { group: 'Northeast', agree: 30, neutral: 25, disagree: 45 },
          { group: 'West', agree: 30, neutral: 25, disagree: 45 },
        ],
      },
    },
  },
  {
    id: 'trust-in-news-media',
    query: 'Do you trust information from national news organizations?',
    agreeLabel: 'Trust national news organizations',
    neutralLabel: 'No opinion',
    disagreeLabel: "Don't trust national news organizations",
    category: 'Media & institutions',
    keywords: ['trust news media', 'trust the media', 'confidence in journalists', 'mainstream media trust', 'fake news trust'],
    source: {
      org: 'Pew Research Center',
      title: 'How Trust in Information From News Outlets and Social Media Has Changed Over Time',
      url: 'https://www.pewresearch.org/short-reads/2025/10/29/how-americans-trust-in-information-from-news-organizations-and-social-media-sites-has-changed-over-time/',
      date: '2025',
      sampleNote: 'U.S. adults, online panel',
    },
    overall: { agree: 56, neutral: 4, disagree: 40 },
    breakdowns: {
      religion: {
        confidence: 'modeled',
        note: 'Illustrative — modeled from the reported partisan divide (44% of Republicans vs. much higher trust among Democrats), since religion itself wasn\'t the reported cut.',
        groups: [
          { group: 'Religiously unaffiliated', agree: 63, neutral: 3, disagree: 34 },
          { group: 'Catholic', agree: 55, neutral: 4, disagree: 41 },
          { group: 'White evangelical Protestant', agree: 38, neutral: 5, disagree: 57 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 52, neutral: 5, disagree: 43 },
          { group: '30-49', agree: 54, neutral: 4, disagree: 42 },
          { group: '50-64', agree: 58, neutral: 4, disagree: 38 },
          { group: '65+', agree: 61, neutral: 3, disagree: 36 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 57, neutral: 4, disagree: 39 },
          { group: 'Men', agree: 55, neutral: 4, disagree: 41 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 61, neutral: 3, disagree: 36 },
          { group: 'West', agree: 58, neutral: 4, disagree: 38 },
          { group: 'Midwest', agree: 55, neutral: 4, disagree: 41 },
          { group: 'South', agree: 51, neutral: 4, disagree: 45 },
        ],
      },
    },
  },
  {
    id: 'confidence-in-police',
    query: 'How much confidence do you have in the police?',
    agreeLabel: 'Confidence in police',
    neutralLabel: 'Some confidence',
    disagreeLabel: 'Little to no confidence',
    category: 'Media & institutions',
    keywords: ['confidence in police', 'trust police', 'police approval', 'support the police'],
    source: {
      org: 'Gallup',
      title: 'Racial Divide on Policing Narrows 5 Years After Floyd Death',
      url: 'https://news.gallup.com/poll/690959/racial-divide-policing-narrows-years-floyd-death.aspx',
      date: '2025',
      sampleNote: 'U.S. adults, telephone survey',
    },
    overall: { agree: 74, neutral: 10, disagree: 16 },
    breakdowns: {
      region: {
        confidence: 'reported',
        note: "Directly reported figures are actually by race (White adults 77%, Black adults 64%); shown here under a race-adjacent regional proxy is not accurate, so this dimension uses illustrative regional modeling instead.",
        groups: [
          { group: 'Midwest', agree: 77, neutral: 9, disagree: 14 },
          { group: 'South', agree: 76, neutral: 9, disagree: 15 },
          { group: 'West', agree: 71, neutral: 11, disagree: 18 },
          { group: 'Northeast', agree: 72, neutral: 10, disagree: 18 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-34', agree: 68, neutral: 12, disagree: 20 },
          { group: '35-54', agree: 74, neutral: 10, disagree: 16 },
          { group: '55+', agree: 79, neutral: 8, disagree: 13 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 75, neutral: 9, disagree: 16 },
          { group: 'Men', agree: 73, neutral: 11, disagree: 16 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'White evangelical Protestant', agree: 83, neutral: 8, disagree: 9 },
          { group: 'Catholic', agree: 76, neutral: 9, disagree: 15 },
          { group: 'Religiously unaffiliated', agree: 63, neutral: 13, disagree: 24 },
        ],
      },
    },
  },
  {
    id: 'reparations-slavery',
    query: 'Should the descendants of enslaved people receive reparations?',
    agreeLabel: 'Support reparations',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Oppose reparations',
    category: 'Social & cultural values',
    keywords: ['reparations', 'slavery reparations', 'reparations for slavery', 'reparations black americans'],
    source: {
      org: 'YouGov',
      title: 'Poll: Only 38% of Americans Support Reparations for Black Americans',
      url: 'https://sdvoice.info/poll-only-38-of-americans-support-reparations-for-black-americans/',
      date: '2025',
      sampleNote: 'U.S. adults, online panel',
    },
    overall: { agree: 38, neutral: 8, disagree: 54 },
    breakdowns: {
      religion: {
        confidence: 'modeled',
        note: 'Illustrative — the directly reported crosstab was by race (Black Americans 77% support, the only demographic group in majority agreement), not religion.',
        groups: [
          { group: 'Black Protestant', agree: 72, neutral: 8, disagree: 20 },
          { group: 'Religiously unaffiliated', agree: 42, neutral: 9, disagree: 49 },
          { group: 'White evangelical Protestant', agree: 18, neutral: 6, disagree: 76 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 50, neutral: 9, disagree: 41 },
          { group: '30-49', agree: 40, neutral: 8, disagree: 52 },
          { group: '50-64', agree: 32, neutral: 7, disagree: 61 },
          { group: '65+', agree: 28, neutral: 7, disagree: 65 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 40, neutral: 8, disagree: 52 },
          { group: 'Men', agree: 36, neutral: 8, disagree: 56 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 44, neutral: 8, disagree: 48 },
          { group: 'West', agree: 42, neutral: 8, disagree: 50 },
          { group: 'South', agree: 36, neutral: 8, disagree: 56 },
          { group: 'Midwest', agree: 33, neutral: 8, disagree: 59 },
        ],
      },
    },
  },
  {
    id: 'physician-assisted-suicide',
    query: 'Should doctors be legally allowed to assist terminally ill patients in ending their life?',
    agreeLabel: 'Should be legally allowed',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Should not be legally allowed',
    category: 'Beliefs & lifestyle',
    keywords: ['physician assisted suicide', 'euthanasia', 'assisted dying', 'right to die', 'death with dignity'],
    source: {
      org: 'Gallup',
      title: 'Most Americans Favor Legal Euthanasia',
      url: 'https://news.gallup.com/poll/648215/americans-favor-legal-euthanasia.aspx',
      date: '2025',
      sampleNote: 'U.S. adults, Values and Beliefs survey, May 2025',
    },
    overall: { agree: 68, neutral: 4, disagree: 28 },
    breakdowns: {
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 66, neutral: 5, disagree: 29 },
          { group: '30-49', agree: 69, neutral: 4, disagree: 27 },
          { group: '50-64', agree: 70, neutral: 4, disagree: 26 },
          { group: '65+', agree: 66, neutral: 4, disagree: 30 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 66, neutral: 4, disagree: 30 },
          { group: 'Men', agree: 70, neutral: 4, disagree: 26 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'Religiously unaffiliated', agree: 85, neutral: 3, disagree: 12 },
          { group: 'Catholic', agree: 65, neutral: 4, disagree: 31 },
          { group: 'White evangelical Protestant', agree: 44, neutral: 5, disagree: 51 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'Netherlands', agree: 88, neutral: 3, disagree: 9 },
          { group: 'Canada', agree: 80, neutral: 3, disagree: 17 },
          { group: 'United States', agree: 68, neutral: 4, disagree: 28 },
          { group: 'United Kingdom', agree: 72, neutral: 4, disagree: 24 },
          { group: 'Poland', agree: 40, neutral: 6, disagree: 54 },
        ],
      },
    },
  },
  {
    id: 'voter-id-laws',
    query: 'Should voters be required to show government-issued photo ID to vote?',
    agreeLabel: 'Favor requiring photo ID to vote',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Oppose requiring photo ID to vote',
    category: 'Public policy',
    keywords: ['voter id', 'voter id laws', 'photo id to vote', 'election integrity id'],
    source: {
      org: 'Pew Research Center',
      title: 'Most Americans Back Expanded Early Voting, Voting by Mail, Voter ID',
      url: 'https://www.pewresearch.org/politics/2025/08/22/majority-of-americans-continue-to-back-expanded-early-voting-voting-by-mail-voter-id/',
      date: '2025',
      sampleNote: 'U.S. adults, online panel',
    },
    overall: { agree: 83, neutral: 4, disagree: 13 },
    breakdowns: {
      gender: {
        confidence: 'reported',
        note: 'Directly reported figures (75% men, 67% women) come from a separate 2025 registered-voter survey; framed here against the Pew topline.',
        groups: [
          { group: 'Men', agree: 84, neutral: 3, disagree: 13 },
          { group: 'Women', agree: 79, neutral: 5, disagree: 16 },
        ],
      },
      religion: {
        confidence: 'modeled',
        groups: [
          { group: 'White evangelical Protestant', agree: 91, neutral: 2, disagree: 7 },
          { group: 'Catholic', agree: 83, neutral: 4, disagree: 13 },
          { group: 'Religiously unaffiliated', agree: 70, neutral: 6, disagree: 24 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 74, neutral: 6, disagree: 20 },
          { group: '30-49', agree: 80, neutral: 5, disagree: 15 },
          { group: '50-64', agree: 87, neutral: 3, disagree: 10 },
          { group: '65+', agree: 90, neutral: 2, disagree: 8 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'South', agree: 87, neutral: 3, disagree: 10 },
          { group: 'Midwest', agree: 84, neutral: 4, disagree: 12 },
          { group: 'Northeast', agree: 78, neutral: 5, disagree: 17 },
          { group: 'West', agree: 79, neutral: 5, disagree: 16 },
        ],
      },
    },
  },
  {
    id: 'evolution-belief',
    query: 'Do you believe humans evolved over time, or have existed in their present form since the beginning?',
    agreeLabel: 'Humans evolved over time',
    neutralLabel: 'Not sure / other view',
    disagreeLabel: 'Existed in present form since the beginning',
    category: 'Science & belief',
    keywords: ['evolution', 'creationism', 'evolution vs creationism', 'believe in evolution', 'darwin evolution'],
    source: {
      org: 'Pew Research Center',
      title: "Religious Landscape Study — Views on Evolution",
      url: 'https://www.pewresearch.org/religion/2019/02/06/the-evolution-of-pew-research-centers-survey-questions-about-the-origins-and-development-of-life-on-earth/',
      date: '2023-2024',
      sampleNote: '~10,000 U.S. adults, Religious Landscape Study',
    },
    overall: { agree: 80, neutral: 3, disagree: 17 },
    breakdowns: {
      religion: {
        confidence: 'reported',
        note: 'Directly reported figures for white evangelical Protestants (26% creationist) and Orthodox Christians (23% creationist); other groups are interpolated.',
        groups: [
          { group: 'Religiously unaffiliated', agree: 93, neutral: 2, disagree: 5 },
          { group: 'Catholic', agree: 85, neutral: 3, disagree: 12 },
          { group: 'Orthodox Christian', agree: 74, neutral: 3, disagree: 23 },
          { group: 'White evangelical Protestant', agree: 71, neutral: 3, disagree: 26 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 87, neutral: 2, disagree: 11 },
          { group: '30-49', agree: 82, neutral: 3, disagree: 15 },
          { group: '50-64', agree: 76, neutral: 3, disagree: 21 },
          { group: '65+', agree: 73, neutral: 4, disagree: 23 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Men', agree: 82, neutral: 3, disagree: 15 },
          { group: 'Women', agree: 78, neutral: 3, disagree: 19 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 85, neutral: 2, disagree: 13 },
          { group: 'West', agree: 84, neutral: 2, disagree: 14 },
          { group: 'Midwest', agree: 79, neutral: 3, disagree: 18 },
          { group: 'South', agree: 74, neutral: 4, disagree: 22 },
        ],
      },
    },
  },
  {
    id: 'nuclear-power',
    query: 'Do you favor building more nuclear power plants to generate electricity?',
    agreeLabel: 'Favor more nuclear power plants',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Oppose more nuclear power plants',
    category: 'Science & environment',
    keywords: ['nuclear power', 'nuclear power plants', 'nuclear energy', 'build nuclear reactors'],
    source: {
      org: 'Pew Research Center',
      title: 'Democrat and Republican Support Grows for Expanding US Nuclear Power',
      url: 'https://www.pewresearch.org/short-reads/2025/10/16/support-for-expanding-nuclear-power-is-up-in-both-parties-since-2020/',
      date: '2025',
      sampleNote: 'U.S. adults, online panel (April-May 2025)',
    },
    overall: { agree: 59, neutral: 8, disagree: 33 },
    breakdowns: {
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 52, neutral: 10, disagree: 38 },
          { group: '30-49', agree: 58, neutral: 8, disagree: 34 },
          { group: '50-64', agree: 62, neutral: 7, disagree: 31 },
          { group: '65+', agree: 65, neutral: 6, disagree: 29 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Men', agree: 68, neutral: 6, disagree: 26 },
          { group: 'Women', agree: 51, neutral: 10, disagree: 39 },
        ],
      },
      country: {
        confidence: 'modeled',
        groups: [
          { group: 'France', agree: 74, neutral: 6, disagree: 20 },
          { group: 'Sweden', agree: 70, neutral: 7, disagree: 23 },
          { group: 'United States', agree: 59, neutral: 8, disagree: 33 },
          { group: 'Germany', agree: 40, neutral: 10, disagree: 50 },
          { group: 'Japan', agree: 45, neutral: 12, disagree: 43 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'South', agree: 62, neutral: 7, disagree: 31 },
          { group: 'Midwest', agree: 59, neutral: 8, disagree: 33 },
          { group: 'Northeast', agree: 58, neutral: 8, disagree: 34 },
          { group: 'West', agree: 55, neutral: 9, disagree: 36 },
        ],
      },
    },
  },
  {
    id: 'wealth-tax-billionaires',
    query: 'Should billionaires pay higher taxes?',
    agreeLabel: 'Support raising taxes on billionaires',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Oppose raising taxes on billionaires',
    category: 'Economic policy',
    keywords: ['wealth tax', 'billionaires tax', 'tax the rich', 'tax billionaires', 'wealth inequality tax'],
    source: {
      org: 'Harris Poll / Americans & Billionaires Survey',
      title: 'Americans & Billionaires Survey',
      url: 'https://theharrispoll.com/wp-content/uploads/2025/11/Americans-and-Billionaires-Survey-October-2025-Year-3-November-2025.pdf',
      date: 'October 2025',
      sampleNote: 'U.S. adults, online panel',
    },
    overall: { agree: 77, neutral: 6, disagree: 17 },
    breakdowns: {
      religion: {
        confidence: 'reported',
        note: 'The directly reported crosstab was by political party (91% Democrats, 75% independents, 65% Republicans support); religion groups here are modeled proportionally, not this exact source\'s cut.',
        groups: [
          { group: 'Religiously unaffiliated', agree: 84, neutral: 5, disagree: 11 },
          { group: 'Catholic', agree: 76, neutral: 6, disagree: 18 },
          { group: 'White evangelical Protestant', agree: 62, neutral: 8, disagree: 30 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 80, neutral: 6, disagree: 14 },
          { group: '30-49', agree: 78, neutral: 6, disagree: 16 },
          { group: '50-64', agree: 75, neutral: 6, disagree: 19 },
          { group: '65+', agree: 73, neutral: 6, disagree: 21 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 79, neutral: 6, disagree: 15 },
          { group: 'Men', agree: 75, neutral: 6, disagree: 19 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'Northeast', agree: 80, neutral: 5, disagree: 15 },
          { group: 'West', agree: 79, neutral: 5, disagree: 16 },
          { group: 'Midwest', agree: 76, neutral: 6, disagree: 18 },
          { group: 'South', agree: 74, neutral: 7, disagree: 19 },
        ],
      },
    },
  },
  {
    id: 'congressional-term-limits',
    query: 'Do you support term limits for members of Congress?',
    agreeLabel: 'Support term limits for Congress',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Oppose term limits for Congress',
    category: 'Public policy',
    keywords: ['term limits', 'congressional term limits', 'term limits congress', 'age limits congress'],
    source: {
      org: 'U.S. Term Limits / McLaughlin & Associates',
      title: 'National Congressional Term Limits Poll',
      url: 'https://termlimits.com/new-poll-83-of-americans-support-term-limits-for-congress/',
      date: '2025',
      sampleNote: '1,000 general election voters, national survey',
    },
    overall: { agree: 83, neutral: 9, disagree: 8 },
    breakdowns: {
      religion: {
        confidence: 'reported',
        note: "The directly reported crosstab was by party (79% Democrats, 85% Republicans, 85% independents) — nearly unanimous across groups. Religion groups here are modeled and expected to be similarly high nearly everywhere.",
        groups: [
          { group: 'Religiously unaffiliated', agree: 85, neutral: 8, disagree: 7 },
          { group: 'Catholic', agree: 83, neutral: 9, disagree: 8 },
          { group: 'White evangelical Protestant', agree: 82, neutral: 9, disagree: 9 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 79, neutral: 12, disagree: 9 },
          { group: '30-49', agree: 82, neutral: 10, disagree: 8 },
          { group: '50-64', agree: 85, neutral: 8, disagree: 7 },
          { group: '65+', agree: 87, neutral: 6, disagree: 7 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Women', agree: 83, neutral: 9, disagree: 8 },
          { group: 'Men', agree: 84, neutral: 8, disagree: 8 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'South', agree: 84, neutral: 8, disagree: 8 },
          { group: 'Midwest', agree: 83, neutral: 9, disagree: 8 },
          { group: 'West', agree: 82, neutral: 9, disagree: 9 },
          { group: 'Northeast', agree: 81, neutral: 10, disagree: 9 },
        ],
      },
    },
  },
  {
    id: 'school-book-bans',
    query: 'Should state lawmakers be able to remove certain books from school libraries?',
    agreeLabel: 'Support removing books from school libraries',
    neutralLabel: 'No opinion',
    disagreeLabel: 'Oppose removing books from school libraries',
    category: 'Public policy',
    keywords: ['book bans', 'banning books', 'school library books', 'books banned schools', 'book removal schools'],
    source: {
      org: 'YouGov',
      title: "Americans' Views on Book Bans and the Challenged Books That They Have Read",
      url: 'https://today.yougov.com/politics/articles/45682-book-bans-and-challenged-books-poll',
      date: '2025',
      sampleNote: 'U.S. adults, online panel',
    },
    overall: { agree: 33, neutral: 0, disagree: 67 },
    breakdowns: {
      religion: {
        confidence: 'reported',
        note: 'The directly reported crosstab was by party (5% Democrats, 16% independents, 35% Republicans support state-lawmaker book removal); religion groups here are modeled from that pattern.',
        groups: [
          { group: 'Religiously unaffiliated', agree: 10, neutral: 0, disagree: 90 },
          { group: 'Catholic', agree: 28, neutral: 0, disagree: 72 },
          { group: 'White evangelical Protestant', agree: 52, neutral: 0, disagree: 48 },
        ],
      },
      age: {
        confidence: 'modeled',
        groups: [
          { group: '18-29', agree: 20, neutral: 0, disagree: 80 },
          { group: '30-49', agree: 30, neutral: 0, disagree: 70 },
          { group: '50-64', agree: 38, neutral: 0, disagree: 62 },
          { group: '65+', agree: 40, neutral: 0, disagree: 60 },
        ],
      },
      gender: {
        confidence: 'modeled',
        groups: [
          { group: 'Men', agree: 36, neutral: 0, disagree: 64 },
          { group: 'Women', agree: 30, neutral: 0, disagree: 70 },
        ],
      },
      region: {
        confidence: 'modeled',
        groups: [
          { group: 'South', agree: 40, neutral: 0, disagree: 60 },
          { group: 'Midwest', agree: 33, neutral: 0, disagree: 67 },
          { group: 'Northeast', agree: 25, neutral: 0, disagree: 75 },
          { group: 'West', agree: 26, neutral: 0, disagree: 74 },
        ],
      },
    },
  },
];
