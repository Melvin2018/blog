import {
    queryer
} from '../storage/queryer.js'

export default class Post {
    constructor(title, body, userId) {
        this.title = title
        this.body = body
        this.userId = userId
    }

    values = () => {
        return [this.title, this.body, this.userId]
    }
    static find = async() => {
        try {
            const res = await queryer('SELECT * FROM public.post')
            return this.hydrate(res.rows)
        } catch (err) {
            return err
        }
    }
    save = async() => {
        try {
            const res = await queryer('INSERT INTO public.post (title, body, "userId") VALUES($1, $2, $3) RETURNING *', ...this.values())
            return Post.hydrate(res.rows).pop()
        } catch (err) {
            return err
        }
    }
    update = async id => {
        try {
            const res = await queryer('UPDATE public.post SET title=$2, body=$3, "userId"=$4 WHERE id=$1 RETURNING *', ...[id, ...this.values()])
            return res.rowCount == 0 ? [] : this.hydrate(res.rows).pop()
        } catch (err) {
            return err
        }
    }

    static findById = async id => {
        try {
            const res = await queryer('SELECT * FROM public.post WHERE id = $1', id)
            return res.rowCount == 0 ? [] : this.hydrate(res.rows).pop()
        } catch (err) {
            return err
        }
    }
    static deleteById = async id => {
        try {
            const res = await queryer('DELETE FROM public.post WHERE id = $1 RETURNING *', id)
            return res.rowCount == 0 ? [] : this.hydrate(res.rows).pop()
        } catch (err) {
            return err
        }
    }

    static hydrate = rows => {
        return rows.map(r => {
            return {
                id: r.id,
                title: r.title,
                body: r.body,
                modified: r.modified,
                created: r.created
            }
        })
    }
}