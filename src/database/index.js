import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('session.db')

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL,email TEXT NOT NULL,idToken TEXT NOT NULL)',
                [],
                () => resolve(),
                (_, err) => reject(err))
        })
    })
    return promise
}
export const insertSession = ({ localId, email, idToken }) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO sessions (localId,email,idToken) VALUES (?,?,?);',
                [localId, email, idToken],
                (_, result) => resolve(result),
                (_, err) => reject(err))
        })
    })
    return promise

}

export const fechSession = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM sessions',
                [],
                (_, result) => resolve(result),
                (_, err) => reject(err))
        })
    })
    return promise

}


export const deleteAllSession = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM sessions',
                [],
                (_, result) => resolve(result),
                (_, err) => reject(err))
        })
    })
    return promise

}