import classNames from "classnames";
import {observer} from "mobx-react-lite";
import {useEffect, useState} from "react";
import {Navigate, NavLink, Route, Routes, useNavigate, useSearchParams} from "react-router-dom";
import AboutPage from "../../pages/AboutPage";
import IndexPage from "../../pages/IndexPage";

import mainStore from "../../store/main.ts";
import Checkbox from "../Checkbox";
import Icon from "../Icon";
import styles from "./index.module.css";

function App(props: any) {

  /* Hooks */
  const $navigate = useNavigate();
  const [$params, $setParams] = useSearchParams();

  /* State */
  const [passwordLength, setPasswordLength] = useState<number>(!isNaN(+($params.get("length") ?? "16")) ? +($params.get(
    "length") ?? "16") : 16);
  const [lettersAllowed, setLettersAllowed] = useState<boolean>($params.get("letters") === "true" || !$params.get(
    "letters"));
  const [numbersAllowed, setNumbersAllowed] = useState<boolean>($params.get("numbers") === "true" || !$params.get(
    "numbers"));
  const [symbolsAllowed, setSymbolsAllowed] = useState<boolean>($params.get("symbols") === "true" || !$params.get(
    "symbols"));

  /* Watch controls */
  useEffect(() => {
    $setParams(new URLSearchParams({
      ...$params,
      length: String(passwordLength),
      letters: String(lettersAllowed),
      numbers: String(numbersAllowed),
      symbols: String(symbolsAllowed)
    }));
  }, [passwordLength, lettersAllowed, numbersAllowed, symbolsAllowed]);

  /* DOM */
  return (
    <div className={styles.App}>

      {/* Header */}
      <header className={styles.header}>
        <h1>My Password</h1>

        <nav>
          <NavLink to="/">{mainStore.language === "ru" ? "Главная" : "Home"}</NavLink>
          <a href="https://congritta.ru/blog/my-password" target="_blank">
            {mainStore.language === "ru" ? "О Проекте" : "About"}
          </a>
          <a href="https://github.com/congritta/my-password" target="_blank">
            {mainStore.language === "ru" ? "Исходный Код" : "Source Code"}
          </a>
        </nav>

        <button
          className={classNames("isZeroed", styles.languageButton)}
          onClick={() => mainStore.setLanguage(mainStore.language === "en" ? "ru" : "en")}
        >
          <Icon icon="language-2" />
        </button>
      </header>

      {/* Main */}
      <main>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerControls}>

          <div className={styles.footerControl}>
            <span>{mainStore.language === "ru" ? "Длина пароля" : "Password length"}:</span>
            <input
              type="text"
              autoComplete="off"
              style={{width: `calc(1.5em + 2*12px)`}}
              value={passwordLength}
              onChange={({target: {value}}) => setPasswordLength(isNaN(+value) ? 0 : +value)}
            />
          </div>

          <div className={styles.footerControl}>
            <Checkbox
              isActive={lettersAllowed}
              label={mainStore.language === "ru" ? "Буквы" : "Letters"}
              onTrigger={() => setLettersAllowed(!lettersAllowed)}
            />
          </div>

          <div className={styles.footerControl}>
            <Checkbox
              isActive={numbersAllowed}
              label={mainStore.language === "ru" ? "Цифры" : "Numbers"}
              onTrigger={() => setNumbersAllowed(!numbersAllowed)}
            />
          </div>

          <div className={styles.footerControl}>
            <Checkbox
              isActive={symbolsAllowed}
              label={mainStore.language === "ru" ? "Символы" : "Symbols"}
              onTrigger={() => setSymbolsAllowed(!symbolsAllowed)}
            />
          </div>

          {/* <div className={styles.footerControl}> */}
          {/*   <Checkbox */}
          {/*     isActive={false} */}
          {/*     label={mainStore.language === "ru" ? "⚡️ Мгновенная генерация" : "⚡️ Instant Generation"} */}
          {/*   /> */}
          {/* </div> */}
        </div>

        <div className={styles.footerCopyrightText}>
          <a href="https://congritta.com" target="_blank">Alex Congritta</a>
          {" "}
          &copy; {(new Date()).getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default observer(App);
