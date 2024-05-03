import { TFeedBack } from "./schemas";

export const user = () => '/api/user';

export const balance = () => '/api/balance';

export const userPlugins = () => '/api/user/plugins';

export const userRole = () => '/api/role';

export const postfeedback = () => `/api/feedback/`;

export const getFeedbacks = () => `/api/feedback/all`;

export const getFeedbackByPreset = (preset: string) => `/api/feedback/${preset}`;

export const getFeedbackByPresetAndPositivity = (preset: string, feedback: boolean) => `/api/feedback/${preset}/${feedback}`;

export const postusercomments = () => `/api/userComments/`;

export const getuserscomments = () => `/api/userComments/all`;

export const getusercommentsById = (userId: string) => `/api/userComments/${userId}`;

export const tokenUsage = () => '/api/tokenUsage';

export const allSkills = () => '/api/teacherSkills';

export const skillsBySubject = (subject: string) => `/api/teacherSkills/subject/${subject}`;

export const skillsBySkill = (skill: string) => `/api/teacherSkills/skill/${skill}`;

export const skillsBySubjectAndSkill = (subject: string, skill: string) => `/api/teacherSkills/${subject}/${skill}`;

export const createSkill = () => '/api/teacherSkills/createSkill';

export const incrementSkill = (subject: string, skill: string) => `/api/teacherSkills/incrementSkill/${subject}/${skill}`;

export const resetSkill = (subject: string, skill: string) => `/api/teacherSkills/resetSkill/${subject}/${skill}`;

export const deleteSkill = (subject: string, skill: string) => `/api/teacherSkills/deleteSkill/${subject}/${skill}`;

export const messages = (conversationId: string, messageId?: string) =>
  `/api/messages/${conversationId}${messageId ? `/${messageId}` : ''}`;

const keysEndpoint = '/api/keys';

export const keys = () => keysEndpoint;

export const userKeyQuery = (name: string) => `${keysEndpoint}?name=${name}`;

export const revokeUserKey = (name: string) => `${keysEndpoint}/${name}`;

export const revokeAllUserKeys = () => `${keysEndpoint}?all=true`;

export const abortRequest = (endpoint: string) => `/api/ask/${endpoint}/abort`;

export const conversations = (pageNumber: string) => `/api/convos?pageNumber=${pageNumber}`;

export const conversationById = (id: string) => `/api/convos/${id}`;

export const genTitle = () => '/api/convos/gen_title';

export const updateConversation = () => '/api/convos/update';

export const deleteConversation = () => '/api/convos/clear';

export const search = (q: string, pageNumber: string) =>
  `/api/search?q=${q}&pageNumber=${pageNumber}`;

export const searchEnabled = () => '/api/search/enable';

export const presets = () => '/api/presets';

export const deletePreset = () => '/api/presets/delete';

export const aiEndpoints = () => '/api/endpoints';

export const endpointsConfigOverride = () => '/api/endpoints/config/override';

export const models = () => '/api/models';

export const tokenizer = () => '/api/tokenizer';

export const login = () => '/api/auth/login';

export const logout = () => '/api/auth/logout';

export const register = () => '/api/auth/register';

export const loginFacebook = () => '/api/auth/facebook';

export const loginGoogle = () => '/api/auth/google';

export const refreshToken = (retry?: boolean) => `/api/auth/refresh${retry ? '?retry=true' : ''}`;

export const requestPasswordReset = () => '/api/auth/requestPasswordReset';

export const resetPassword = () => '/api/auth/resetPassword';

export const plugins = () => '/api/plugins';

export const config = () => '/api/config';

export const assistants = (id?: string, options?: Record<string, string>) => {
  let url = '/api/assistants';

  if (id) {
    url += `/${id}`;
  }

  if (options && Object.keys(options).length > 0) {
    const queryParams = new URLSearchParams(options).toString();
    url += `?${queryParams}`;
  }

  return url;
};

export const files = () => '/api/files';

export const images = () => `${files()}/images`;

export const avatar = () => `${images()}/avatar`;
