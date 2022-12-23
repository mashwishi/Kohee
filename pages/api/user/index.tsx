/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { endpoint_key } = req.headers;

  if (endpoint_key !== `${process.env.ENDPOINT_KEY_PROD}`) {
    res.json({ message: `Invalid Key` });
    return
  }

  const { type, data, object } = req.body;

  const create_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/create`
  const update_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/update`
  const delete_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/delete`

  const headers = 
  {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
  };

  switch(type) {
    case 'user.created':

      // if (req.method !== 'POST'){
      //   res.json({ 
      //     message: `Invalid Method`,
      //     method: `POST`,
      //   });
      //   return
      // }

      try {
        await axios.post(create_api_url, {
          object: {
            id: `${data.id}`,
            first_name: `${data.first_name}`,
            username: `${data.first_name.toLowerCase().replaceAll(' ', '_')}`,
            profile_image_url: `${data.profile_image_url}`,
            updated_at: `${data.updated_at}`,
            created_at: `${data.created_at}`
          }
        },{headers: headers})
        .then(response => {
          res.json(
            response.status == 200 ? 
            {
              user_id: `${data.id}`,
              first_name: `${data.first_name}`,
              username: `${data.first_name.toLowerCase().replaceAll(' ', '_')}`,
              profile_image_url: `${data.profile_image_url}`,
              updated_at: `${data.updated_at}`,
              created_at: `${data.created_at}`,
              message: 'User successfully added to database!'
            } : 
            {
              data: `${data}`,
              message: 'Failed, Something went wrong!'
            }
          );
        });
      } catch (e) {

        res.status(400).json(
        { 
            error: (e as Error).message,
            message: `Retrying please wait...`
        });

        try {
        await axios.post(create_api_url, {
        object: {
        id: `${data.id}`,
        first_name: `${data.first_name}`,
        username: `${data.first_name.toLowerCase().replaceAll(' ', '_')}`,
        profile_image_url: `${data.profile_image_url}`,
        updated_at: `${data.updated_at}`,
        created_at: `${data.created_at}`
        }
        },{headers: headers})
        .then(response => {
        res.json(
        response.status == 200 ? 
        {
        user_id: `${data.id}`,
        first_name: `${data.first_name}`,
        username: `${data.first_name.toLowerCase().replaceAll(' ', '_')}`,
        profile_image_url: `${data.profile_image_url}`,
        updated_at: `${data.updated_at}`,
        created_at: `${data.created_at}`,
        message: 'User successfully added to database!'
        } : 
        {
        data: `${data}`,
        message: 'Failed, Something went wrong!'
        }
        );
        });
        } catch (e) {

        res.status(400).json(
        { 
        error: (e as Error).message
        });

      }

      }
      
      break;

    case 'user.updated':

      // if (req.method !== 'PUT'){
      //   res.json({ 
      //     message: `Invalid Method`,
      //     method: `PUT`,
      //   });
      //   return
      // }
      
      try {
        await axios.put(update_api_url, {
            id: `${data.id}`,
            first_name: `${data.first_name}`,
            last_name: `${data.last_name}`,
            username: `${data.username.toLowerCase().replaceAll(' ', '_')}`,
            profile_image_url: `${data.profile_image_url}`,
            updated_at: `${data.updated_at}`,
            created_at: `${data.created_at}`
        },{headers: headers})
        .then(response => {
          res.json(
            response.status == 200 ? 
            {
              user_id: `${data.id}`,
              first_name: `${data.first_name}`,
              last_name: `${data.last_name}`,
              username: `${data.first_name.toLowerCase().replaceAll(' ', '_')}`,
              profile_image_url: `${data.profile_image_url}`,
              updated_at: `${data.updated_at}`,
              created_at: `${data.created_at}`,
              message: 'User successfully updated to database!'
            } : 
            {
              user_id: `${data.id}`,
              first_name: `${data.first_name}`,
              last_name: `${data.last_name}`,
              username: `${data.first_name.toLowerCase()}`,
              profile_image_url: `${data.profile_image_url}`,
              updated_at: `${data.updated_at}`,
              created_at: `${data.created_at}`,
              message: 'Failed, Something went wrong!'
            }
          );
        });
      } catch (e) {

        res.status(400).json(
        { 
            error: (e as Error).message,
            message: `Retrying please wait...`
        });

        try {
        await axios.put(update_api_url, {
            id: `${data.id}`,
            first_name: `${data.first_name}`,
            last_name: `${data.last_name}`,
            username: `${data.username.toLowerCase().replaceAll(' ', '_')}`,
            profile_image_url: `${data.profile_image_url}`,
            updated_at: `${data.updated_at}`,
            created_at: `${data.created_at}`
        },{headers: headers})
        .then(response => {
          res.json(
            response.status == 200 ? 
            {
              user_id: `${data.id}`,
              first_name: `${data.first_name}`,
              last_name: `${data.last_name}`,
              username: `${data.first_name.toLowerCase().replaceAll(' ', '_')}`,
              profile_image_url: `${data.profile_image_url}`,
              updated_at: `${data.updated_at}`,
              created_at: `${data.created_at}`,
              message: 'User successfully updated to database!'
            } : 
            {
              user_id: `${data.id}`,
              first_name: `${data.first_name}`,
              last_name: `${data.last_name}`,
              username: `${data.first_name.toLowerCase()}`,
              profile_image_url: `${data.profile_image_url}`,
              updated_at: `${data.updated_at}`,
              created_at: `${data.created_at}`,
              message: 'Failed, Something went wrong!'
            }
          );
        });
        } catch (e) {
          res.status(400).json({ error: (e as Error).message });
        }

      }

      break;

    case 'user.deleted':

      // if (req.method !== 'DELETE'){
      //   res.json({ 
      //     message: `Invalid Method`,
      //     method: `DELETE`,
      //   });
      //   return
      // }

      try {
        await axios.delete(delete_api_url, { data: { id: `${data.id}` }, headers: headers })
        .then(response => {
          res.json(
            response.status == 200 ? 
            {
              user_id: `${data.id}`,
              message: 'User successfully deleted to database!'
            } : 
            {
              user_id: `${data.id}`,
              message: 'Failed, Something went wrong!'
            }
          );
        });
      } catch (e) {
        res.status(400).json({ error: (e as Error).message });
      }

      break;

    default:
      res.json({ 
        message: `Invalid Request: User method type not found.`,
      });
      
  }

};