import axios from "axios"
import 'dotenv/config'

export default class{
  async getCourse(baseUrl:string){
    const response = await axios.get(baseUrl);
    const responseEdges = await axios.get(process.env.URL_FREE_CODE_CAMP_EDGES);
    const edgesData = responseEdges.data
    let challenges = []
    let challengesRaw = response.data.challengeOrder
    for(let i=1;i<= challengesRaw.length;i++){
      let slug = "";
      let blockName = "";
      for(let e=0;e<edgesData.length;e++){
        if(edgesData[e]?.node?.challenge?.id == challengesRaw[i-1]?.id){
          slug = edgesData[e].node.challenge.fields.slug;
          blockName = edgesData[e].node.challenge.fields.blockName;
          break
        }
      }
      challenges.push({...challengesRaw[i-1],index:i,slug,blockName});
    }
    return challenges
  }

  async mountMarkdownData(){
    const baseUrl = process?.env?.URL_FREE_CODE_CAMP ? process.env.URL_FREE_CODE_CAMP : "";
    const courseData = await this.getCourse(baseUrl);
    let markdown = ""
    markdown = `# ${courseData[0].blockName}`
    for(let i=0;i < courseData.length;i++){
      markdown += `\n - [ ] ${courseData[i].index}  [${courseData[i].title}](${process.env.URL_BASEFREE_CODE_CAMP}${courseData[i].slug})`
    }
    return markdown;
  }
}
