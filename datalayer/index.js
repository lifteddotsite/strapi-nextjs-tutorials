let datasource = {}

import  * as contentfulJobAPI from './contentful/job'; 
import * as contentfulCompanyAPI from './contentful/company'; 
if (process.env.DATALAYER_ENGINE === 'contentful')
  datasource = {...contentfulCompanyAPI, ...contentfulJobAPI}


import * as strapiJobAPI from './strapi/job';
import * as strapiCompanyAPI from './strapi/company';
if (process.env.DATALAYER_ENGINE === 'strapi')
  datasource = { ...strapiCompanyAPI, ...strapiJobAPI };

export default datasource




