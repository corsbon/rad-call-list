// DEFAULT CALL LIST. Edit this file to change the numbers everyone starts with.
// Row format: [label, number, type, shownByDefault]
//   type: "tech" | "provider" | "other"   (controls which section the number appears under)
//   number: add ",1234" on the end to dial an extension (comma = short pause)
// Source: Dartmouth regional radiology groups page. Verify numbers before relying on them.
// If you change numbers here, also bump "version" so phones pick up the new list
// (note: bumping the version resets anyone's personal on/off choices).
window.RADCALL_DATA = {
  version: 1,
  sites: [
    { id: 'apd', code: 'APD', name: 'Alice Peck Day', group: 'Hospitals', nums: [
      ['Radiology', '603-308-0014', 'tech', 1],
      ['CT', '603-308-0302', 'tech', 1],
      ['MRI', '603-308-0304', 'tech', 1],
      ['US', '603-308-0303', 'tech', 1],
      ['ED', '603-308-0016', 'provider', 1],
      ['Reading Room', '603-308-0308', 'provider', 1],
      ['Med Surge', '603-448-7409', 'provider', 0],
      ['Main Switchboard', '603-448-3121', 'other', 0],
      ['Radiology Fax', '603-308-0319', 'other', 0],
      ['ED Fax', '603-448-7481', 'other', 0]
    ] },
    { id: 'avh', code: 'AVH', name: 'Androscoggin Valley', group: 'Hospitals', nums: [
      ['Radiology', '603-326-5720', 'tech', 1],
      ['Radiology Techs', '603-326-5727', 'tech', 1],
      ['ED', '603-326-5706', 'provider', 1],
      ['Main Switchboard', '603-752-2200', 'other', 0],
      ['ED Fax', '603-326-5716', 'other', 0]
    ] },
    { id: 'bmh', code: 'BMH', name: 'Brattleboro Memorial', group: 'Hospitals', nums: [
      ['Radiology', '802-257-8332', 'tech', 1],
      ['CT', '802-257-8845', 'tech', 1],
      ['MRI', '802-257-8891', 'tech', 1],
      ['DX', '802-257-8332', 'tech', 0],
      ['US', '802-257-8397', 'tech', 1],
      ['US (second line)', '802-257-8234', 'tech', 0],
      ['Nuclear Medicine', '802-257-8256', 'tech', 1],
      ['ED', '802-275-3636', 'provider', 1],
      ['Reading Room', '802-251-8410', 'provider', 1],
      ['Main Switchboard', '802-257-0341', 'other', 0],
      ['Radiology Fax', '802-257-8849', 'other', 0],
      ['ED Fax', '802-257-8377', 'other', 0]
    ] },
    { id: 'che', code: 'CHE', name: 'Cheshire', group: 'Hospitals', nums: [
      ['Radiology', '603-354-2539', 'tech', 1],
      ['CT', '603-354-6890', 'tech', 1],
      ['MRI (ext 2663)', '603-354-5400,2663', 'tech', 1],
      ['MRI (ext 2356)', '603-354-5400,2356', 'tech', 0],
      ['Nuclear Medicine', '603-354-2354', 'tech', 1],
      ['ED', '603-354-6999', 'provider', 1],
      ['Main Switchboard', '603-354-5400', 'other', 0],
      ['Radiology Fax', '603-354-6877', 'other', 0],
      ['ED Fax', '603-354-6605', 'other', 0]
    ] },
    { id: 'coph', code: 'COPH', name: 'Copley', group: 'Hospitals', nums: [
      ['Radiology', '802-888-8358', 'tech', 1],
      ['CT', '802-888-8232', 'tech', 1],
      ['DX', '802-888-8606', 'tech', 1],
      ['MRI', '802-888-8314', 'tech', 1],
      ['Nuclear Medicine', '802-888-8687', 'tech', 1],
      ['US', '802-888-8364', 'tech', 1],
      ['ED', '802-888-8171', 'provider', 1],
      ['Reading Room', '802-888-8211', 'provider', 1],
      ['Main Switchboard', '802-888-8888', 'other', 0],
      ['Radiology Fax', '802-888-8394', 'other', 0],
      ['ED Fax', '802-888-8142', 'other', 0]
    ] },
    { id: 'ch', code: 'CH', name: 'Cottage', group: 'Hospitals', nums: [
      ['Radiology', '603-747-9213', 'tech', 1],
      ['ED', '603-747-9128', 'provider', 1],
      ['Reading Room', '603-747-9218', 'provider', 1],
      ['Main Switchboard', '603-747-9000', 'other', 0],
      ['Radiology Fax', '603-747-2953', 'other', 0],
      ['ED Fax', '603-747-2694', 'other', 0]
    ] },
    { id: 'hh', code: 'HH', name: 'Huggins', group: 'Hospitals', nums: [
      ['Radiology', '603-569-7529', 'tech', 1],
      ['ED', '603-569-7575', 'provider', 1],
      ['Reading Room', '603-569-7528', 'provider', 1],
      ['Main Switchboard', '603-569-7500', 'other', 0],
      ['Radiology Fax', '603-569-7531', 'other', 0],
      ['ED Fax', '603-569-7622', 'other', 0]
    ] },
    { id: 'mah', code: 'MAH', name: 'Mount Ascutney', group: 'Hospitals', nums: [
      ['Radiology', '802-674-7276', 'tech', 1],
      ['Radiology Techs', '802-674-7068', 'tech', 1],
      ['ED', '802-674-7220', 'provider', 1],
      ['Reading Room', '802-674-7080', 'provider', 1],
      ['Main Switchboard', '802-674-6711', 'other', 0],
      ['Radiology Fax', '802-674-7099', 'other', 0],
      ['ED Fax', '802-674-7006', 'other', 0]
    ] },
    { id: 'nlh', code: 'NLH', name: 'New London', group: 'Hospitals', nums: [
      ['Radiology', '603-526-5249', 'tech', 1],
      ['Radiology Techs', '603-526-5208', 'tech', 1],
      ['MRI', '603-526-5295', 'tech', 1],
      ['US', '603-526-5179', 'tech', 1],
      ['ED', '603-526-5257', 'provider', 1],
      ['Reading Room', '603-526-5230', 'provider', 1],
      ['Med Surge', '603-526-5210', 'provider', 0],
      ['Main Switchboard', '603-526-2911', 'other', 0],
      ['Radiology Fax', '603-526-5394', 'other', 0],
      ['ED Fax', '603-526-5176', 'other', 0]
    ] },
    { id: 'speare', code: '—', name: 'Speare Memorial', group: 'Hospitals', nums: [
      ['Radiology Techs', '603-326-5727', 'tech', 1],
      ['ED', '603-326-5706', 'provider', 1],
      ['Main Switchboard', '603-536-1120', 'other', 0],
      ['ED Fax', '603-326-5716', 'other', 0]
    ] },
    { id: 'sh', code: 'SH', name: 'Springfield', group: 'Hospitals', nums: [
      ['CT', '802-885-7326', 'tech', 1],
      ['DX', '802-885-7370', 'tech', 1],
      ['MRI', '802-885-7330', 'tech', 1],
      ['Nuclear Medicine', '802-885-7327', 'tech', 1],
      ['US', '802-885-7377', 'tech', 1],
      ['ED', '802-885-7540', 'provider', 1],
      ['Reading Room', '802-885-7320', 'provider', 1],
      ['Main Switchboard', '802-885-2151', 'other', 0],
      ['ED Fax', '802-885-7555', 'other', 0]
    ] },
    { id: 'ucvh', code: 'UCVH', name: 'Upper Connecticut Valley', group: 'Hospitals', nums: [
      ['Radiology', '603-388-4231', 'tech', 1],
      ['ED', '603-388-4227', 'provider', 1],
      ['Main Switchboard', '603-237-4971', 'other', 0],
      ['ED Fax', '603-237-4594', 'other', 0]
    ] },
    { id: 'vrh', code: 'VRH', name: 'Valley Regional', group: 'Hospitals', nums: [
      ['Radiology', '603-542-3406', 'tech', 1],
      ['ED', '603-542-1822', 'provider', 1],
      ['Reading Room', '603-542-7815', 'provider', 1],
      ['Med Surge', '603-542-1886', 'provider', 0],
      ['Urgent Care', '603-542-7888', 'provider', 0],
      ['Main Switchboard', '603-542-7771', 'other', 0],
      ['Radiology Fax', '603-542-1820', 'other', 0],
      ['ED Fax', '603-542-1153', 'other', 0]
    ] },
    { id: 'wmc', code: 'WMC', name: 'Weeks Medical Center', group: 'Hospitals', nums: [
      ['Radiology', '603-788-5011', 'tech', 1],
      ['ED', '603-788-5004', 'provider', 1],
      ['Main Switchboard', '603-788-4911', 'other', 0],
      ['ED Fax', '603-788-5049', 'other', 0]
    ] },

    { id: 'dh-bedford', code: 'CGP', name: 'D-H Bedford Radiology', group: 'Community group practices', nums: [
      ['Radiology', '603-695-2859', 'tech', 1]
    ] },
    { id: 'dh-concord', code: 'CGP', name: 'D-H Concord Radiology', group: 'Community group practices', nums: [
      ['Radiology', '603-229-5060', 'tech', 1]
    ] },
    { id: 'dh-manchester', code: 'CGP', name: 'D-H Manchester Radiology', group: 'Community group practices', nums: [
      ['Radiology', '603-695-2850', 'tech', 1]
    ] },
    { id: 'dh-nashua', code: 'CGP', name: 'D-H Nashua Radiology', group: 'Community group practices', nums: [
      ['Radiology', '603-577-4070', 'tech', 1]
    ] },

    { id: 'dhmc-outreach', code: 'DHMC', name: 'Outreach Workflow Coordinator', group: 'DHMC', nums: [
      ['Coordinator', '603-650-3852', 'provider', 1]
    ] }
  ]
};
