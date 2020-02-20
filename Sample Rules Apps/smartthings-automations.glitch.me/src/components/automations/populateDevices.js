export function populateDevices(capability, elementId, placeholderText) {
  let theDevices = JSON.parse(localStorage.getItem('devices'));
  let theDevicesString = '<option value="">'+placeholderText+'</option>';
  for (let x = 0; x < theDevices.length; x++) {
    for (let y = 0; y < theDevices[x]['components'][0]['capabilities'].length; y++) {
        if (theDevices[x]['components'][0]['capabilities'][y]['id'] === capability) {
          theDevicesString += "<option value="+theDevices[x]['deviceId']+">"+theDevices[x]['name']+"</option>";
        }
    }
  }
  document.querySelector(elementId).innerHTML='';
  document.querySelector(elementId).insertAdjacentHTML('beforeend', theDevicesString);
}