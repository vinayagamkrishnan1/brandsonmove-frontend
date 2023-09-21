import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query users($userid: uuid!) {
    object: users(where: { id: { _eq: $userid } }) {
      id
      name
    }
  }
`;

// export const GET_ALL_MEETING_SCHEDULE = gql`
//   query meetings($userid: uuid!) {
//     objects: meetings(where: { id: { _eq: $userid } }) {
//       name
//       email
//       company_name
//       interested_areas
//       meeting_type
//     }
//   }
// `;


export const GET_ALL_MEETING_SCHEDULE = gql`
  query meetings(
    $where: meetings_bool_exp
    $order_by: [meetings_order_by!]
    $limit: Int
    $offset: Int
  ) {
    objects: meetings(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      id
      name
      email
      company_name
      interested_areas
      meeting_type
      timeslot1
      timeslot1_status
      timeslot2
      timeslot2_status
      timeslot3
      timeslot3_status
    }
  }
`;

export const GET_MEETING_LINKS = gql`
  query meetinglinks(
    $where: meetinglinks_bool_exp
    $order_by: [meetinglinks_order_by!]
    $limit: Int
    $offset: Int
  ) {
    objects: meetinglinks(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      id
      link
      link_type
      passcode
      created_at
      modified_at
    }
  }
`;

export const LOGIN = gql`
  query Login($username: String!, $password: String!) { 
    users(where: { name: { _eq: $username }, password: { _eq: $password } }) {
      id
      email
      mobile_number
    } 
  }
`;

export const GET_SCHEDULED_DATE_TIME_FOR_MONTH = gql`
  query MyQuery($today: timestamptz!, $endDate: timestamptz!) {
    meetings: meetings(where: {created_at: {_lte: $endDate, _gte: $today}}) {
      id
      timeslot1
      timeslot2
      timeslot3
    }
  }
`;

export const GET_MEETING_INFO = gql`
  query FetchMeetingByID($meetingid: uuid!) {
    meetings_by_pk(id: $meetingid) {
      id
      email
      meeting_type
      timeslot1_is_accepted
      timeslot2_is_accepted
      timeslot3_is_accepted
      timeslot1_is_declined
      timeslot2_is_declined
      timeslot3_is_declined
      timeslot1
      timeslot2
      timeslot3
      inivitation_link
    } 
  }
`;

export const Q_GET_CONTACT_INFO = gql`
  query FetchContactInfoByID($id: uuid!) {
    contacts_by_pk(id: $id) {
      id
      phone1
      phone2
      email
      address
    } 
  }
`;



// export const GET_SCHEDULED_DATE_TIME = gql`
//   query GetScheduledMeetings($today: timestamptz!, $selectedDate: timestamptz!) {
//     meetings(
//       where: {
//         timeslot1: {_gte: $today, _lte: $selectedDate},
//         _and: {timeslot2: {_gte: $today, _lte: $selectedDate},
//         _and: {timeslot3: {_gte: $today, _lte: $selectedDate}}},
//       }
//     ) {
//       id
//       timeslot1
//       timeslot1_status
//       timeslot2
//       timeslot2_status
//       timeslot3
//       timeslot3_status
//     }
//   }
// `;


// query GetSchudledMeetings($today: timestamptz!, $selectedDate: timestamptz!) {
//   meetings(
//     where: {
//       _and: {timeslot1: {_gte: $today, _lte: $selectedDate},
//       _and: {timeslot2: {_gte: $today, _lte: $selectedDate},
//       _and: {timeslot3: {_gte: $today, _lte: $selectedDate}}}},
//     }
//   ) {
//     id
//     timeslot1
//     timeslot1_status
//     timeslot2
//     timeslot2_status
//     timeslot3
//     timeslot3_status
//   }
// }
