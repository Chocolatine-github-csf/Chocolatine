const axios = require('axios');
const TeacherSkills = require('./TeacherSkills.js');
const List = 'inclassable, tableau, algorithme, classe, fonction, boucle, recherche, dichotomique, insertion, selection, bulle, asynchrone, synchrone, api, binaire';
const ClassList = 'intro-prog, objet, bases de donnees, web, maths, reseau, cybersecurite, IoT';

const oneWordRequest = async (request, list) => {
  const prompt = `Choisissez exactement un mot de la liste suivante pour synthetiser la requete : ${list}. Voici la question : ${request}. Ta reponse ne doit contenir que le mot de la liste que tu as selectionne et lui seul.`;
  let instanceName = 'h24-420-w57-sf-12005-openai-eastus';
  let deployment = 'gpt-35-turbo-eastus';
  let apiVersion = '2024-02-15-preview';
  let apiKey = '392caae89afc4ba9bb79325186e14150';
  const endpoint = `https://${instanceName}.openai.azure.com/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}&api-key=${apiKey}`;
  try{
    const response = await axios.post(endpoint, {
      messages: [
        { role: 'user', content: prompt },
      ],
      max_tokens: 10,
      temperature: 1,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const aiResponse =  response.data.choices[0].message.content;
    const oneWord = aiResponse.trim();
    console.log('subject: ', oneWord);
    return oneWord;
  } catch (error) {
    if (error.response) {
      console.error('API response error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request error:', error.message);
    }
    throw error;
  }
};

const synthetiseRequest = async (request) => {
  try{
    const subject = await oneWordRequest(request, ClassList);
    const skill = await oneWordRequest(request, List);
    console.log('subject: ', subject);
    console.log('skill: ', skill);
    const skillAlreadyExist = await TeacherSkills.findOne({ subject, skill });

    if (!skillAlreadyExist) {
      const newSkill = new TeacherSkills({ subject, skill });
      await newSkill.save();
    }
    else{
      await TeacherSkills.updateOne({ subject, skill }, { $inc: { count: 1 } });
    }

  } catch (error) {
    if (error.response) {
      console.error('API response error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request error:', error.message);
    }
    throw error;
  }
};

module.exports = {
  synthetiseRequest,
};