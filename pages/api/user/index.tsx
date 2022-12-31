/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { nanoid } from 'nanoid'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { endpoint_key } = req.headers;

  if (endpoint_key !== `${process.env.ENDPOINT_KEY_PROD}`) {
    res.status(403).json({error: `Invalid Key`});
    return
  }

  const { type, data, object } = req.body;



  const create_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/create`
  const update_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/update`
  const delete_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/delete`
  const get_api_url = `${process.env.NEXT_PUBLIC_HASURA_REST_API}/user/get`

  const headers = 
  {
    "Content-Type": "application/json",
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_SECRET}`
  };


  switch(type) {
    case 'user.created':

      try {

        await axios.post(create_api_url, {
          object: {
            id: `${data.id}`,
            first_name: `${data.first_name}`,
            username: `${data.id}`,
            profile_image_url: `${data.profile_image_url}`,
            updated_at: `${data.updated_at}`,
            created_at: `${data.created_at}`
          }
        },{headers: headers})
        .then(response => {
          console.log(response.data)
          res.json(
            response.status == 200 ? 
            {
              data: { response },
              id: `${response.data.id}`,
              first_name: `${response.data.first_name}`,
              username: `${response.data.id}`,
              profile_image_url: `${response.data.profile_image_url}`,
              updated_at: `${response.data.updated_at}`,
              created_at: `${response.data.created_at}`,
              message: 'User successfully added to database!'
            } : 
            {
              message: 'Failed, Something went wrong!'
            }
          );
        });
      } catch (e) {
        res.status(400).json(
        { 
            error: (e as Error).message,
        });
      }
      
      break;

    case 'user.updated':

    try {
      const timestamp = new Date().getTime();
      
      await axios.get(get_api_url + `/${data.username}`, {headers: headers})
      .then(async response => {
          if(response.status == 200){
              try {
                await axios.put(update_api_url, {
                    id: `${data.id}`,
                    first_name: `${data.first_name}`,
                    last_name: `${data.last_name}`,
                    username: `${data.username}`,
                    profile_image_url: `${data.profile_image_url}`,
                    updated_at: `${data.updated_at ? data.updated_at : timestamp}`,
                    created_at: `${data.created_at}`
                },{headers: headers})
                .then(response => {
                  res.json(
                    response.status == 200 ? 
                    {
                      user_id: `${data.id}`,
                      first_name: `${data.first_name}`,
                      last_name: `${data.last_name}`,
                      username: `${data.username}`,
                      profile_image_url: `${data.profile_image_url}`,
                      updated_at: `${data.updated_at ? data.updated_at : timestamp}`,
                      created_at: `${data.created_at}`,
                      message: 'User successfully updated to database!'
                    } : 
                    {
                      message: 'Failed, Something went wrong!'
                    }
                  );
                });
              } catch (e) {
                res.status(400).json({ error: (e as Error).message });
              }

          }else{
            res.json({message: 'Failed, Something went wrong!'});
          }
      });
      } catch (e) {
          res.status(400).json({ error: (e as Error).message });
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