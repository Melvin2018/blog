import bcrypt from "bcrypt"
import {
    queryer
} from '../storage/queryer.js'

export default class User {

    constructor(firstName, lastName, email, password) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }

    values = () => {
        return [this.firstName, this.lastName, this.email, this.hashPassword(this.password)]
    }

    static find = async(id = '') => {
            try {
                const res = await queryer(`SELECT * FROM public.user ${id===''? '': `WHERE CAST(id AS TEXT) LIKE '${id}'`}`)
            return this.hydrate(res.rows)
        } catch (err) {
            throw err
        }
    }
    save = async () => {
        try {
            const res = await queryer('INSERT INTO public.user ("firstname", "lastname", email, password) VALUES($1, $2, $3, $4) RETURNING *', ...this.values())
            return User.hydrate(res.rows).pop()
        } catch (err) {
            throw err
        }
    }
    update = async (id) => {
        try {
            const res = await queryer('UPDATE public."user" SET "firstname"=$2, "lastname"=$3, email=$4, password=$5 WHERE id=$1 RETURNING *', ...[id, ...this.values()])
            const found = res.rowCount > 0
            return {
                found,
                user: this.hydrate(res.rows).pop()
            }
        } catch (err) {
            throw err
        }
    }
    static verifyEmail = async id => {
        try {
            const res = await queryer('UPDATE public.user SET email_verified=TRUE WHERE id = $1 RETURNING *', id)
            const found = res.rowCount > 0
            return {
                found,
                user: this.hydrate(res.rows).pop()
            }
        } catch (err) {
            throw err
        }
    }
    static deleteById = async id => {
        try {
            const res = await queryer('DELETE FROM public.user WHERE id = $1 RETURNING *', id)
            const found = res.rowCount > 0
            return {
                found,
                user: this.hydrate(res.rows).pop()
            }
        } catch (err) {
            throw err
        }
    }
    static hydrate = rows => {
        return rows.map(r => {
            return {
                id: r.id,
                firstName: r.firstname,
                lastName: r.lastname,
                email: r.email,
                modified: r.modified,
                created: r.created,
                emailVerified: r.email_verified
            }
        })
    }
    hashPassword = textPlain => {
        return bcrypt.hashSync(textPlain, 8)
    }
    static isPasswordValid = async (password, hash) => {
        try {
            const valid = await bcrypt.compare(password, hash)
            return valid
        } catch (err) {
            return err
        }
    }

    static findByEmailAndComparePassword = async (email, password) => {
        try {
            const res = await queryer('SELECT * FROM public.user WHERE email = $1', email)
            if (res.rowCount === 0) return {
                valid: false,
                found: false,
                user: null
            };
            const valid = this.isPasswordValid(password, res.rows[0].password)
            return {
                valid: valid,
                found: true,
                user: this.hydrate(res.rows).pop()
            }
        } catch (err) {
            return err
        }
    }
}