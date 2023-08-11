/**
 * @prettier
 * @flow
 */

import getContacts from './api/getContacts';
import getMessages from './api/getMessages';
import getMyUserProfile from './api/getMyUserProfile';
import getUserProfile from './api/getUserProfile';
import getUserProfiles from './api/getUserProfiles';
import login from './api/login';
import sendFile from './api/sendFile';
import sendMessage from './api/sendMessage';
import type {UserProfile} from './api/formatUserProfile';

import type {Tokens} from './api/login';

class SkypeWebApi {
  tokens: Tokens;

  constructor(tokens?: Tokens) {
    if (tokens) {
      this.tokens = tokens;
    }
  }

  login = async (username: string, password: string) => {
    this.tokens = await login(username, password);
  };

  getMyUserProfile = async () => getMyUserProfile(this.tokens.skypeToken.value);

  getUserProfile = async (username: string) =>
    getUserProfile(this.tokens.skypeToken.value, username);

  getUserProfiles = async (usernames: string[]) =>
    getUserProfiles(this.tokens.skypeToken.value, usernames);

  sendFile = async (
    fileBuffer: Buffer,
    fileName: string,
    recipientMri: string,
  ) =>
    sendFile(
      fileBuffer,
      fileName,
      recipientMri,
      this.tokens.skypeToken.value,
      this.tokens.registrationToken.value,
    );

  sendMessage = async (text: string, recipientMri: string) =>
    sendMessage(text, recipientMri, this.tokens.registrationToken.value);

  getContacts = async () => getContacts(this.tokens.skypeToken.value);

  getMessages = async (contactMri: string) =>
    getMessages(contactMri, this.tokens.registrationToken.value);
}

export {
  getContacts,
  getMessages,
  getMyUserProfile,
  getUserProfile,
  getUserProfiles,
  login,
  sendFile,
  sendMessage,
};

export type {UserProfile};

export default SkypeWebApi;
