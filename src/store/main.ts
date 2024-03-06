import {makeAutoObservable} from "mobx";

type Language = "en" | "ru"

export class MainStore {

  language: Language = "en";

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage(language: Language) {
    this.language = language;
  }

}

export default new MainStore();
