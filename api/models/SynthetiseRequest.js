const axios = require('axios');
const TeacherSkills = require('./TeacherSkills.js');

const twoWordsRequest = async (request) => {
  const prompt = `Tu recevras une requête d'un étudiant. Ta tâche est d'analyser cette requête et de la synthétiser en un mot pour le sujet (subject) et en un mot pour la compétence (skill). Utilise les listes suivantes pour sélectionner les mots appropriés.

  Liste des sujets (subject) :
  - divers
  - intro-prog
  - prog-orientee-objet
  - bases-de-donnees
  - web
  - maths
  - reseau
  - cybersecurite
  - IoT
  
  Liste des compétences (skill) :
  - inclassable
  - tableau
  - algorithme
  - classe
  - fonction
  - boucle
  - asynchrone
  - synchrone
  - api
  - binaire
  - Templates
  - Bibliotheques
  
  Format de réponse :
  json
  {
    "subject": "...",
    "skill": "..."
  }
  
  Voici un exemple de requête d'un étudiant pour t'aider :
  "L'étudiant demande de l'aide pour un tableau et comprendre les concepts de boucles."
  
  Réponse attendue :
  json
  {
    "subject": "intro-prog",
    "skill": "tableau"
  }
  
  Maintenant, analyse la requête suivante et fournis une réponse au format JSON :
  
  Requête de l'étudiant : ${request}
  `;

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
      max_tokens: 100,
      temperature: 1,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const aiResponse =  response.data.choices[0].message.content.trim();
    const { subject, skill } = JSON.parse(aiResponse);
    console.log('reponse: ', aiResponse);

    return { subject , skill };
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
    const { subject, skill } = await twoWordsRequest(request);
    const skillAlreadyExist = await TeacherSkills.findOne({ subject, skill });

    skillAlreadyExist ?
      await TeacherSkills.updateOne({ subject, skill }, { $inc: { count: 1 } })
      :
      await new TeacherSkills({ subject, skill }).save();

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