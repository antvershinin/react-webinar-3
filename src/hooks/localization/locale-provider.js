import React, { createContext, useContext, useState } from 'react'
import * as translations from './translations/translations.json' 

const LocaleContext = createContext()

function LocaleProvider({children}) {
    const [lang, setLang] = useState('ru')

    const changeLang = (newLang) => {
        setLang(newLang)
    }

    const langList = [{"code" : 'ru', "name" : "Русский"}, {"code" : 'eng', "name" : "English"}]

    const translate = (key) => translations[lang][key] 

    const value = {lang, langList, changeLang, translate}

    return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export default LocaleProvider
export const useLocale = () => useContext(LocaleContext)