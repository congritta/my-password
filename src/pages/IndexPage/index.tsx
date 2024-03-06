import classNames from "classnames";
import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import Icon from "../../components/Icon";
import {getRandomNumber} from "../../helpers/misc.ts";

import mainStore from "../../store/main.ts";
import styles from "./index.module.css";

let _letters = "abcdefghijklmnopqrstuvwxyz";
_letters += _letters.toUpperCase();
const letters = _letters.split("");

const numbers = "013456789".split("");
const symbols = "!@#$%^&*(){}[]:;\"',./\\|".split("");

function IndexPage() {

  /* Hooks */
  const [$params, $setParams] = useSearchParams();

  /* State */
  const [password, setPassword] = useState<string>("");

  /* Generate password function */
  function generatePassword() {

    const length = !isNaN(+($params.get("length") ?? "16")) ? +($params.get("length") ?? "16") : 16;
    const lettersAllowed = $params.get("letters") === "true" || !$params.get("letters");
    const numbersAllowed = $params.get("numbers") === "true" || !$params.get("numbers");
    const symbolsAllowed = $params.get("symbols") === "true" || !$params.get("symbols");

    if(!lettersAllowed && !numbersAllowed && !symbolsAllowed) return;

    const passwordMatrix = [
      ...(lettersAllowed ? letters : []),
      ...(numbersAllowed ? numbers : []),
      ...(symbolsAllowed ? symbols : []),
    ];

    let _password = "";

    for(let i = 0; i < length; i++) {
      _password += passwordMatrix[getRandomNumber(0, passwordMatrix.length - 1)];
    }

    setPassword(_password);
  }

  /* Generate password at start */
  useEffect(() => {
    generatePassword();

    window.addEventListener("mousewheel", () => generatePassword());
    window.addEventListener("touchmove", () => generatePassword());

    return () => {
      window.removeEventListener("mousewheel", () => generatePassword());
      window.removeEventListener("touchmove", () => generatePassword());
    };
  }, [$params]);

  /* DOM */
  return (
    <div className={styles.IndexPage} onClick={() => window.navigator.clipboard.writeText(password)}>
      <div className={styles.contentsWrapper}>
        <div className={styles.passwordWrapper}>
          <div className={styles.password}>
            {password}
          </div>

          <button className={classNames("isZeroed", styles.copyButton)}>
            <Icon icon="copy-filled" />
          </button>
        </div>

        <div className={classNames(styles.hint, "_desktop")}>
          {mainStore.language === "ru" ? (
            "Нажмите, чтобы скопировать. Скролльте, чтобы поменять пароль"
          ) : (
            "Click to copy. Scroll for new password"
          )}
        </div>

        <div className={classNames(styles.hint, "_touch")}>
          {mainStore.language === "ru" ? (
            "Тапните, чтобы скопировать. Свайпайте, чтобы поменять пароль"
          ) : (
            "Tap to copy. Swipe for new password"
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(IndexPage);
