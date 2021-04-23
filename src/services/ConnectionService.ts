import {getCustomRepository, Repository} from "typeorm";
import {ConnectionsRespository} from "../repositories/ConnectionsRespository";
import {Connection} from "../entities/Connection";

interface IConnectionCreate {
    socket_id: string
    user_id: string
    admin_id?: string
    id?: string
}

class ConnectionService {
    private connectionRespository: Repository<Connection>;

    constructor() {
        this.connectionRespository = getCustomRepository(ConnectionsRespository)
    }

    async create({socket_id, user_id, admin_id, id}: IConnectionCreate) {
        const connection = this.connectionRespository.create({
            socket_id,
            user_id,
            admin_id,
            id
        })

        await this.connectionRespository.save(connection)

        return connection
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionRespository.findOne(user_id)

        return connection
    }


}

export {ConnectionService}