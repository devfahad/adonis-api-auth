// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
    // Controller methods

    public async index() {
        return {hello: "adonis api"}
    }
}
