import  * as contentfulJobAPI from './contentful/job'; 
import * as contentfulCompanyAPI from './contentful/company'; 

let datasource = {}
if (process.env.DATALAYER_ENGINE === 'contentful')
  datasource = {...contentfulCompanyAPI, ...contentfulJobAPI}


export default datasource




