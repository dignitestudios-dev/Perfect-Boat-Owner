export const taskTypeData = {
    RoutineInspection: [
      "Inspect Hull for Stress Cracks, blisters and distortion",
      "Inspect bottom paint for growth",
      "Inspect Prop(s) for dings, pitting and distortion",
      "Inspect Rudder and Rudder Post for damage and Secure",
      "Inspect prop shaft seals for leaks and cracks",
      "Inspect Control Cables (Steering & Throttle)",
      "Inspect Outdrive Bellows for cracked or dried spots",
      "Inspect Grey and Fresh water tanks",
      "Check stoves and remote tanks for loose fitting and leaking hoses",
      "Inspect all hoses for cracking and potential leaks. (Replace as necessary)",
    ],
    InspectElectronicsElectrical: [
      "Inspect all electronics for proper power and function",
      "Check Battery chargers and maintainers for proper functioning",
      "Check Battery Terminal Connections (Clean Corrosion)",
      "Check all Lights are operating properly (replace bulbs/fuses as needed)",
      "Check radios and audio systems for proper function",
      "Inspect Breaker box making sure everything is in working order as well as systems are engaging properly.",
    ],
    CheckMaintain: [
      "Check and Replace Deteriorated Zincs",
      "Check Power Steering and Power Trim Oil Levels (Lubricate)",
      "Grease all fittings",
      "Inspect and Lubricate Seacocks",
    ],
    FuelSystemMaintenance: [
      "Check Fuel Condition. Use Additives to balance. (Stabilizer)",
      "Check Fuel Lines for Cracks and Leaks",
      "Check Fuel Filters, making sure they are properly dated from the previous service, change if needed.",
      "Inspect fuel transfer/pump filter",
    ],
    MechanicalDrivelineMaintenance: [
      "Engage engines making sure they are inline running at the appropriate RPMs",
      "Inspect Transmission for leaks, check fluid levels",
      "Inspect all filters, if they need changing, replace O-rings also",
      "Exercise thrusters",
      "Inspect generator for leaks, check coolant and oil levels",
      "Check for wear or damage to the driveline components",
      "Lubricate moving parts where necessary",
    ]
  };

  export const recurringOptions = [
    { value: "none", label: "None" },
    { value: "30", label: "30 days" },
    { value: "45", label: "45 days" },
    { value: "60", label: "60 days" },
    { value: "90", label: "90 days" },
    { value: "180", label: "180 days" },
    { value: "365", label: "1 year" },
    { value: "custom", label: "Custom" },
  ];