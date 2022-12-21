import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

import Todo from "App/Models/Todo"

export default class TodosController {
    // Controller methods
    
    public async index({ request }: HttpContextContract) {

        /** Pagination feature */
        // const page = request.input('page', 1)
        // const limit = request.input('per_page', 3) // show 3 todos per page, by default
        // const todos = await Database.from('todos').paginate(page, limit)
        // return todos

        const todos = await Todo.all() // select * from todo
        return todos.map(todo => todo.serialize({fields:['id', 'title', 'is_completed']}))
    }

    public async store({request, response}: HttpContextContract) {
        Todo.create({title: request.input('title'), is_completed: false}) // create a row in db
        return response.status(201).json({'created': true})
    }

    public async update({request, response, params}: HttpContextContract) {
        const todo = await Todo.findOrFail(params.id) // extract data from db
        todo.is_completed = request.input('is_completed')
        todo.save()

        return response.status(202).send(todo.is_completed)
    }
}