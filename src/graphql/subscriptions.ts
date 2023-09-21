import { gql } from "@apollo/client";

export const USER_SUBSCRIPTION = gql`
  subscription GetUserByID($id: uuid!) {
    user: users(where: { id: { _eq: $id } }) {
      id
      name
      mobile_number
    }
  }
`;

export const GET_CONTENT = gql`
  subscription GetContent(
    $where: contents_bool_exp
    $order_by: [contents_order_by!]
    $limit: Int
    $offset: Int
  ) {
    content: contents(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      id
      heading1
      heading2
      heading3
      paragraph
      created_at
      document_link
    }
  }
`;

export const GET_ALL_MEETING_TIMINGS = gql`
  subscription GetMeetingTimings(
    $where: meetings_bool_exp
    $order_by: [meetings_order_by!]
    $limit: Int
    $offset: Int
  ) {
    meetings: meetings(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      timeslot1
      timeslot2
      timeslot3
    }
  }
`;

export const GET_ADMINS = gql`
  subscription GetAdmins(
    $where: users_bool_exp
    $order_by: [users_order_by!]
    $limit: Int
    $offset: Int
  ) {
    users: users(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      id
      name
      mobile_number
      email
      user_type
    }
  }
`;

export const GET_MEETING_LINKS_SUB = gql`
  subscription GetMeetingLinks(
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

export const GET_ALL_MEETING_SCHEDULE_SUB = gql`
  subscription GetScheduledMeetings(
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
      inivitation_link
      passcode
      timeslot1
      timeslot2
      timeslot3
      timeslot1_is_accepted
      timeslot2_is_accepted
      timeslot3_is_accepted
      timeslot1_is_declined
      timeslot2_is_declined
      timeslot3_is_declined
      is_meeting_completed
      meeting_notes
    }
  }
`;

export const GET_CONTACT_INFO = gql`
  subscription GetContactInfo(
    $where: contacts_bool_exp
    $order_by: [contacts_order_by!]
    $limit: Int
    $offset: Int
  ) {
    objects: contacts(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      id
      phone1
      phone2
      email
      address
    }
  }
`;