var particles =
{
    list:
	{
        "explosion":
		{
            "lifetime": {
                "min": 0.5,
                "max": 0.5
            },
            "frequency": 0.008,
            "emitterLifetime": 0.31,
            "maxParticles": 1000,
            "addAtBack": false,
            "pos": {
                "x": 0,
                "y": 0
            },
            "behaviors": [
                {
                    "type": "alpha",
                    "config": {
                        "alpha": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.8
                                },
                                {
                                    "time": 1,
                                    "value": 0.1
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "moveSpeed",
                    "config": {
                        "speed": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 200
                                },
                                {
                                    "time": 1,
                                    "value": 100
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "scale",
                    "config": {
                        "scale": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 1
                                },
                                {
                                    "time": 1,
                                    "value": 0.3
                                }
                            ]
                        },
                        "minMult": 1
                    }
                },
                {
                    "type": "color",
                    "config": {
                        "color": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": "fb1010"
                                },
                                {
                                    "time": 1,
                                    "value": "f5b830"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "rotationStatic",
                    "config": {
                        "min": 0,
                        "max": 360
                    }
                },
                {
                    "type": "textureRandom",
                    "config": {
                        "textures": [
                            "images/particle.png"
                        ]
                    }
                },
                {
                    "type": "spawnShape",
                    "config": {
                        "type": "torus",
                        "data": {
                            "x": 0,
                            "y": 0,
                            "radius": 10,
                            "innerRadius": 0,
                            "affectRotation": false
                        }
                    }
                }
            ]
        },
        "frame":
        {
            "lifetime": {
                "min": 0.1,
                "max": 0.3
            },
            "frequency": 0.001,
            "emitterLifetime": 0,
            "maxParticles": 1000,
            "addAtBack": false,
            "pos": {
                "x": 0,
                "y": 0
            },
            "behaviors": [
                {
                    "type": "alpha",
                    "config": {
                        "alpha": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.62
                                },
                                {
                                    "time": 1,
                                    "value": 0
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "moveSpeedStatic",
                    "config": {
                        "min": 500,
                        "max": 500
                    }
                },
                {
                    "type": "scale",
                    "config": {
                        "scale": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.25
                                },
                                {
                                    "time": 1,
                                    "value": 0.75
                                }
                            ]
                        },
                        "minMult": 1
                    }
                },
                {
                    "type": "color",
                    "config": {
                        "color": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": "fff191"
                                },
                                {
                                    "time": 1,
                                    "value": "ff622c"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "rotation",
                    "config": {
                        "accel": 0,
                        "minSpeed": 50,
                        "maxSpeed": 50,
                        "minStart": 265,
                        "maxStart": 275
                    }
                },
                {
                    "type": "textureRandom",
                    "config": {
                        "textures": [
                            "images/particle.png",
                            "images/Fire.png"
                        ]
                    }
                },
                {
                    "type": "spawnShape",
                    "config": {
                        "type": "torus",
                        "data": {
                            "x": 0,
                            "y": 0,
                            "radius": 10,
                            "innerRadius": 0,
                            "affectRotation": false
                        }
                    }
                }
            ]
        },
        "flare":
        {
            "lifetime": {
                "min": 0.1,
                "max": 0.20
            },
            "frequency": 0.001,
            "emitterLifetime":10,
            "maxParticles": 40,
            "updatetime":0.004,
            "addAtBack": false,
            "pos": {
                "x": 0,
                "y": 0
            },
            "behaviors": [
                {
                    "type": "alpha",
                    "config": {
                        "alpha": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.62
                                },
                                {
                                    "time": 1,
                                    "value": 0
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "moveSpeedStatic",
                    "config": {
                        "min": 500,
                        "max": 500
                    }
                },
                {
                    "type": "scale",
                    "config": {
                        "scale": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 0.25
                                },
                                {
                                    "time": 1,
                                    "value": 0.75
                                }
                            ]
                        },
                        "minMult": 1
                    }
                },
                {
                    "type": "color",
                    "config": {
                        "color": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": "b0ff9d"
                                },
                                {
                                    "time": 1,
                                    "value": "FFFF9D"
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "rotation",
                    "config": {
                        "accel": 0,
                        "minSpeed": 50,
                        "maxSpeed": 50,
                        "minStart": 265,
                        "maxStart": 275
                    }
                },
                {
                    "type": "textureRandom",
                    "config": {
                        "textures": [
                            "images/particle.png",
                            "images/Fire.png"
                        ]
                    }
                },
                {
                    "type": "spawnShape",
                    "config": {
                        "type": "torus",
                        "data": {
                            "x": 0,
                            "y": 1,
                            "radius": 10,
                            "innerRadius": 0,
                            "affectRotation": false
                        }
                    }
                }
            ]
        },
        "pulsar": { // New pulsar/firework effect
            "lifetime": {
                "min": 0.2,
                "max": 0.35
            },
            "frequency": 0.02,
            "maxParticles": 20,
            "addAtBack": false,
            "pos": {
                "x": 0,
                "y": 0
            },
            "behaviors": [
                {
                    "type": "alpha",
                    "config": {
                        "alpha": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 1
                                },
                                {
                                    "time": 1,
                                    "value": 0
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "moveSpeed",
                    "config": {
                        "speed": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 400
                                },
                                {
                                    "time": 1,
                                    "value": 100
                                }
                            ]
                        }
                    }
                },
                {
                    "type": "scale",
                    "config": {
                        "scale": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": 1
                                },
                                {
                                    "time": 1,
                                    "value": 0
                                }
                            ]
                        },
                        "minMult": 0.5
                    }
                },
                {
                    "type": "color",
                    "config": {
                        "color": {
                            "list": [
                                {
                                    "time": 0,
                                    "value": "ffffff" // White
                                },                                                                
                                {
                                    "time": 0.3,
                                    "value": "ffff77" // Blue
                                },
                                {
                                    "time": 0.9,
                                    "value": "ff1493" // Purple
                                },
                                {
                                    "time": 1.0,
                                    "value": "ff4500" // Red
                                },
                            ]
                        }
                    }
                },
                {
                    "type": "rotationStatic",
                    "config": {
                        "min": 0,
                        "max": 360
                    }
                },
                {
                    "type": "textureRandom",
                    "config": {
                        "textures": [
                            "images/particles/circle_particle.png" // Replace with your particle texture
                        ]
                    }
                },
                {
                    "type": "spawnShape",
                    "config": {
                        "type": "circle", // Switch to a supported shape like 'circle'
                        "data": {
                            "x": 0,
                            "y": 0,
                            "radius": 20,
                            "innerRadius": 0,
                            "affectRotation": false
                        }
                    }
                }
            ]
        }
    }
}