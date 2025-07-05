import express from 'express'
import authmiddlware from '../Middleware/auth.js';
import Tasks from "../Controller/taskController.js"

const taskrouter=express.Router();

taskrouter.route('/gp')
.get(authmiddlware,Tasks.gettask)
.post(authmiddlware,Tasks.createtask)

taskrouter.route('/:id/gp')
.get(authmiddlware,Tasks.gettaskbyid)
.put(authmiddlware,Tasks.updateTask)
.delete(authmiddlware,Tasks.deletetask);
export default taskrouter