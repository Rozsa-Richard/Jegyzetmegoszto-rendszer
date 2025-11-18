import { Badge, ListGroup } from "react-bootstrap"
import Header from "../components/Header"
import Pencil from "../components/Pencil"
import {useEffect, useState } from "react"
import { type User } from "../types/types"
import apiClient from "../api/apiClient"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

const ProfilesPage = () => {
    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(()=> {
        apiClient.get("/users")
            .then((r) => setUsers(r.data))
            .catch(() => toast.error("Jegyzetelők betöltése sikertelen"));
    },[]);

    return (
        <>
        <Header />
        
        <div className='page'>
            <Pencil/>

            <div className="title">
            <h1>Jegyzetelők</h1>
            </div>

            <div className='w-6'>
                <ListGroup>
                    {users.map((u)=> (
                        <Link to={`/profile/${u.id}`}>
                            <ListGroup.Item  key={u.id} className="d-flex justify-content-between align-items-start">
                                <div>{u.name}</div>
                                <Badge pill bg="secondary">
                                    {}
                                </Badge>
                            </ListGroup.Item>
                        </Link>))}
                </ListGroup>
            </div>
        </div>
        </>  
    )
}

export default ProfilesPage