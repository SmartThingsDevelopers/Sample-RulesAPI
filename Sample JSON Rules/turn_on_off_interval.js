{
    "name": "Turn switch on for 30 seconds, turn off for 30 seconds, repeat",
    "actions": [
        {
            "every": {
                "interval": {
                    "value": {
                        "integer": 1
                    },
                    "unit": "Minute"
                },
                "actions": [
                    {
                        "command": {
                            "devices": [
                                "f42e284d-fa01-4a09-a55e-adbdda632ac2"
                            ],
                            "commands": [{
                                "component": "main",
                                "capability": "switch",
                                "command": "on",
                                "arguments": []
                            }]
                        }
                    },
                    {
                        "sleep": {
                            "duration": {
                                "value": {
                                  "integer": 30
                                },
                                "unit": "second"
                            }
                        }
                    },
                    {
                        "command": {
                            "devices": [
                                "f42e284d-fa01-4a09-a55e-adbdda632ac2"
                            ],
                            "commands": [{
                                "component": "main",
                                "capability": "switch",
                                "command": "off",
                                "arguments": []
                            }]
                        }
                    },
                ]
            }
        }
    ]
}