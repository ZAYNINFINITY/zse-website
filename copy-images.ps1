# ZSE Store — Copy matched images from sanitary.pk assets to ZSE project
# Run this from PowerShell as-is

$src = "D:\uploaded_images"
$dst = "D:\WORK - ARCHIVE\IMPORTANT CODING DATA AND PROJECTS\PROJECTS\zse-websitev1\assets\products"

# Create destination if it doesn't exist
New-Item -ItemType Directory -Force -Path $dst | Out-Null

$copies = @(
    # Valves
    @{ from="Valve.jpg";                                    to="valve.jpg" },
    @{ from="Safety-Valve1.jpg";                            to="safety-valve.jpg" },
    @{ from="Stop-Cock1.jpg";                               to="stop-cock.jpg" },
    @{ from="PPRC-No-Return-Valve1.jpg";                    to="no-return-valve.jpg" },
    @{ from="Union-No-Return-Valve1.jpg";                   to="union-no-return-valve.jpg" },
    @{ from="Union-No-Return-Valve2.jpg";                   to="union-no-return-valve2.jpg" },
    @{ from="Valve-With-Union-Plastic-To-Plastic.jpg";      to="union-valve-pp.jpg" },
    @{ from="Valve-With-Union-Pastic-To-Metal.jpg";         to="union-valve-pm.jpg" },

    # Elbows
    @{ from="Elbow1.jpg";                                   to="elbow-ppr.jpg" },
    @{ from="Equal-Elbow1.jpg";                             to="elbow-equal.jpg" },
    @{ from="Elbow-Female-Metal1.jpg";                      to="elbow-female-metal.jpg" },
    @{ from="Elbow-Female-Metal2.jpg";                      to="elbow-female-metal2.jpg" },
    @{ from="Reducing-Elbow1.jpg";                          to="elbow-reducing.jpg" },
    @{ from="3D-Elbow2.jpg";                                to="elbow-3d.jpg" },
    @{ from="3D-Elbow-Female-Metal.jpg";                    to="elbow-3d-female-metal.jpg" },
    @{ from="Clump-Elbow-Female-Metal1.jpg";                to="elbow-clump-female.jpg" },

    # Tees
    @{ from="Equal-Tee1.jpg";                               to="tee-equal.jpg" },
    @{ from="Reducing-Tea1.jpg";                            to="tee-reducing.jpg" },
    @{ from="Tea-Female-Metal2.jpg";                        to="tee-female-metal.jpg" },
    @{ from="Tee-Female-Metal-Side-Bush1.jpg";              to="tee-female-side-bush.jpg" },
    @{ from="Tee-Male-Metal1.jpg";                          to="tee-male-metal.jpg" },
    @{ from="3D-Tee1.jpg";                                  to="tee-3d.jpg" },
    @{ from="3D-Female-Metal-Tee1.jpg";                     to="tee-3d-female-metal.jpg" },
    @{ from="Y-Tee.jpg";                                    to="tee-y.jpg" },

    # Sockets
    @{ from="Socket1.jpg";                                  to="socket-ppr.jpg" },
    @{ from="Socket-Female-Metal1.jpg";                     to="socket-female-metal.jpg" },
    @{ from="Socket-Male-Metal1.jpg";                       to="socket-male-metal.jpg" },
    @{ from="Reducer-Socket1.jpg";                          to="socket-reducer.jpg" },

    # Unions
    @{ from="Union-PPRC.jpg";                               to="union-ppr.jpg" },
    @{ from="Union-PPRC-Female-Threaded.jpg";               to="union-female-threaded.jpg" },

    # End caps / plugs
    @{ from="End-Cap1.jpg";                                 to="end-cap.jpg" },
    @{ from="Screw-Plug1.jpg";                              to="screw-plug.jpg" },

    # C-band clamps
    @{ from="PPRC-Hock1.jpg";                               to="c-band-clamp.jpg" },
    @{ from="Mixer-Clump1.jpg";                             to="mixer-clamp.jpg" },
    @{ from="Mixer-Clump-Fixed1.jpg";                       to="mixer-clamp-fixed.jpg" },
    @{ from="Mixer-Clump-Adjustable1.jpg";                  to="mixer-clamp-adj.jpg" },
    @{ from="Clump1.jpg";                                   to="clump.jpg" },

    # Cross
    @{ from="Cross1.jpg";                                   to="cross-fitting.jpg" },

    # Over-Cross
    @{ from="Over-Cross1.jpg";                              to="over-cross.jpg" },

    # Pipes
    @{ from="PPRC-PIPES.jpg";                               to="pprc-pipes.jpg" },
    @{ from="PPRC-FITTINGS.jpg";                            to="pprc-fittings.jpg" },
    @{ from="UPVC-PIPES.jpg";                               to="upvc-pipes.jpg" },
    @{ from="UPVC-FITTINGS.jpg";                            to="upvc-fittings.jpg" },
    @{ from="master-pprc-pipes.jpg";                        to="master-pprc-pipes.jpg" },
    @{ from="master-pprc-fittings.jpg";                     to="master-pprc-fittings.jpg" },
    @{ from="master-upvc-pipes.jpg";                        to="master-upvc-pipes.jpg" },
    @{ from="master-upvc-fittings.jpg";                     to="master-upvc-fittings.jpg" },
    @{ from="dadex-pprc-pipes1.jpg";                        to="dadex-pprc-pipes.jpg" },
    @{ from="dadex-pprc-fittings2.jpg";                     to="dadex-pprc-fittings.jpg" },
    @{ from="dadex-upvc-pipes1.jpg";                        to="dadex-upvc-pipes.jpg" },
    @{ from="dadex-upvc-fittings1.jpg";                     to="dadex-upvc-fittings.jpg" },
    @{ from="largepipes.jpg";                               to="large-pipes.jpg" },
    @{ from="largepipes1.jpg";                              to="large-pipes2.jpg" },

    # Taps & mixers
    @{ from="Basin-Mixer.jpg";                              to="basin-mixer.jpg" },
    @{ from="Basin-Mixer1.jpg";                             to="basin-mixer2.jpg" },
    @{ from="Basin-Waste.jpg";                              to="basin-waste.jpg" },
    @{ from="Basin-Waste1.jpg";                             to="basin-waste2.jpg" },
    @{ from="Double-Bib-Cock.jpg";                          to="double-bib-cock.jpg" },
    @{ from="Double-Bib-Cock1.jpg";                         to="double-bib-cock2.jpg" },
    @{ from="Tee-Cock.jpg";                                 to="tee-cock.jpg" },
    @{ from="Tee-Cock1.jpg";                                to="tee-cock2.jpg" },
    @{ from="Muslim-Shower.jpg";                            to="muslim-shower.jpg" },
    @{ from="Muslim-Shower1.jpg";                           to="muslim-shower2.jpg" },
    @{ from="Wall-Shower.jpg";                              to="wall-shower.jpg" },
    @{ from="Wall-Shower1.jpg";                             to="wall-shower2.jpg" },
    @{ from="sink-mixer.jpg";                               to="sink-mixer.jpg" },
    @{ from="Vanity-Mixer.jpg";                             to="vanity-mixer.jpg" },
    @{ from="Single-Lever.jpg";                             to="single-lever.jpg" },

    # Water tanks
    @{ from="basa-water-tank.jpg";                          to="water-tank.jpg" },
    @{ from="basa-vertical-water-tank1.jpg";                to="water-tank-vertical.jpg" },
    @{ from="basa-horizontal-water-tank1.jpg";              to="water-tank-horizontal.jpg" },
    @{ from="100-gallons.jpg";                              to="tank-100gal.jpg" },
    @{ from="150-gallons.jpg";                              to="tank-150gal.jpg" },
    @{ from="200-gallons.jpg";                              to="tank-200gal.jpg" },
    @{ from="300-gallons.jpg";                              to="tank-300gal.jpg" },
    @{ from="500-gallons.jpg";                              to="tank-500gal.jpg" },

    # Ceramics
    @{ from="china-WC-brite-sanitary-ware.jpg";             to="wc-toilet.jpg" },
    @{ from="medium-WC-brite-sanitary-ware.jpg";            to="wc-medium.jpg" },
    @{ from="master-sanitary-ware-basin-pedestal2.jpg";     to="wash-basin.jpg" },
    @{ from="master-sanitary-ware-wall-hung-basin1.jpg";    to="wash-basin-wall.jpg" },

    # Accessories / bathroom
    @{ from="Sink-Bowl.jpg";                                to="sink-bowl.jpg" },
    @{ from="Mirror2.jpg";                                  to="mirror.jpg" },
    @{ from="imported-brush-holder1.jpg";                   to="brush-holder.jpg" },
    @{ from="imported-soap-dishes1.jpg";                    to="soap-dish.jpg" },
    @{ from="imported-towel-rails1.jpg";                    to="towel-rail.jpg" },
    @{ from="imported-towel-rings1.jpg";                    to="towel-ring.jpg" },
    @{ from="imported-paper-holders1.jpg";                  to="paper-holder.jpg" },
    @{ from="Hand_Shower.jpg";                              to="hand-shower.jpg" },
    @{ from="Shower_Hose.png";                              to="shower-hose.png" },
    @{ from="imported-muslim-shower1.jpg";                  to="muslim-shower-imported.jpg" },
    @{ from="imported-sensor-taps1.jpg";                    to="sensor-tap.jpg" },
    @{ from="imported-tee-cock1.jpg";                       to="tee-cock-imported.jpg" },
    @{ from="kitchen-accessories.jpg";                      to="kitchen-accessories.jpg" }
)

$success = 0
$failed = 0

foreach ($item in $copies) {
    $srcFile = Join-Path $src $item.from
    $dstFile = Join-Path $dst $item.to
    
    if (Test-Path $srcFile) {
        Copy-Item -Path $srcFile -Destination $dstFile -Force
        Write-Host "COPIED: $($item.from) -> $($item.to)" -ForegroundColor Green
        $success++
    } else {
        Write-Host "MISSING: $($item.from)" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
Write-Host "Done: $success copied, $failed not found" -ForegroundColor Cyan
