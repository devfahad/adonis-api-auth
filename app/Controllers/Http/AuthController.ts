import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'


export default class AuthController {
    /** Controller methods */

    public async register({ request, response }: HttpContextContract) {
        
        /** Schema definition */
        const newUserSchema  = schema.create({
            email: schema.string([
                rules.email(),
                rules.unique({ table: 'users', column: 'email' })
            ]),
            password: schema.string([
                rules.confirmed(),
                rules.minLength(7)
            ])
        })

        /** Validate request body against the schema. here, payload is the data */
        const payload = await request.validate({ schema: newUserSchema  })

        /** Create user in the db */
        const user = await User.create(payload)

        return response.created(user)
    }

    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            const token = await auth.attempt(email, password)
            return token.toJSON();
        } catch {
            return response.badRequest('Invalid credentials')
        }
    }
}
