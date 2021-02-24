const stateURL = `${process.env.REACT_APP_ROOT_URL}/qa`;

export const createQA = async (qa) => {
  const body = { qa };
  try {
    const response = await window.fetch(`${stateURL}/create`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json',
      },
    });

    if (response.status === 201 || response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error in creating qa', { qa, body });
    return false;
  }
};

export const readAllQa = async () => {
  try {
    const response = await window.fetch(`${stateURL}/readAll`);
    if (response.status === 200) {
      const body = await response.json();
      return body.qas ?? [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error in fetching all data');
    return [];
  }
};

export const deleteQa = async (id) => {
  try {
    const response = await window.fetch(`${stateURL}/delete?id=${id}`, {
      method: 'POST',
    });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error in deleting QA', { id });
    return true;
  }
};
