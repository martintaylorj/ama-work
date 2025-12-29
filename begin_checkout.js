function T(k=!1) {
                        try {
                            const v = new Date
                              , y = this.selectedCruise?.startDate ? new Date(this.selectedCruise.startDate) : new Date
                              , Z = Math.ceil((y.getTime() - v.getTime()) / 864e5)
                              , E = parseFloat(this.bookingInformation.bookingPayload.invoiceTotal.toFixed(2))
                              , q = Ce.u.getCurrency(this.queryParams.site)
                              , A = y.toISOString().split("T")[0]
                              , R = v.toISOString().split("T")[0];
                            window.dataLayer.push({
                                ecommerce: null
                            }),
                            (0,
                            Ut.a)([this.cruiseService.selectedCruise$, this.extensionService.selectedGuest1PreExtension$, this.extensionService.selectedGuest1PostExtension$, this.extensionService.selectedGuest2PreExtension$, this.extensionService.selectedGuest2PostExtension$]).pipe((0,
                            G.q)(1)).subscribe( ([D,B,Q,z,ae]) => {
                                const me = []
                                  , we = D?.cruise?.region
                                  , Ee = D?.pax || 2;
                                if (D?.cruise) {
                                    const Y = D.cruise;
                                    me.push({
                                        item_id: Y.packageCode ?? null,
                                        item_name: Y.name ?? null,
                                        affiliation: "CBE",
                                        discount: 0,
                                        item_category: "cruise",
                                        item_category2: we ?? null,
                                        item_category3: D.category?.categoryCode ?? null,
                                        item_category4: Y.genericName ?? null,
                                        item_category5: Y.shipName ?? null,
                                        price: 1 == Ee ? D.category.singlePrice : D.category.doublePrice,
                                        quantity: Ee,
                                        embark_city: Y.embarkCity ?? null,
                                        disembark_city: Y.disembarkCity ?? null,
                                        start_date: Y.startDate ? new Date(Y.startDate).toISOString().split("T")[0] : null,
                                        end_date: Y.endDate ? new Date(Y.endDate).toISOString().split("T")[0] : null,
                                        itinerary_river: Y?.riverName ?? null
                                    })
                                }
                                const ct = [...B.map(Y => ({
                                    ...Y,
                                    guestSequenceNumber: 1,
                                    prePostMode: "PRE"
                                })), ...Q.map(Y => ({
                                    ...Y,
                                    guestSequenceNumber: 1,
                                    prePostMode: "POST"
                                })), ...z.map(Y => ({
                                    ...Y,
                                    guestSequenceNumber: 2,
                                    prePostMode: "PRE"
                                })), ...ae.map(Y => ({
                                    ...Y,
                                    guestSequenceNumber: 2,
                                    prePostMode: "POST"
                                }))]
                                  , tt = new Map;
                                ct.forEach(Y => {
                                    const Me = Y.packageType;
                                    if (tt.has(Me)) {
                                        const Pe = tt.get(Me);
                                        Pe.price = Y.doublePrice,
                                        Pe.quantity = 2
                                    } else
                                        tt.set(Me, {
                                            ...Y,
                                            price: Y.singlePrice,
                                            quantity: 1
                                        })
                                }
                                ),
                                Array.from(tt.values()).forEach( (Y, Me) => {
                                    me.push({
                                        item_id: Y.packageType ?? null,
                                        item_name: Y.packageName ?? null,
                                        affiliation: "CBE",
                                        discount: 0,
                                        item_category: "land packages",
                                        item_category2: we ?? null,
                                        item_category3: Y.prePostMode ?? null,
                                        item_category4: D?.cruise?.genericName ?? null,
                                        item_category5: Y.packageName ?? null,
                                        price: Y.price ?? 0,
                                        quantity: parseInt(Y.quantity),
                                        total_nights: Y.totalNights ?? null,
                                        start_date: Y.startDate ? new Date(Y.startDate).toISOString().split("T")[0] : null,
                                        end_date: Y.endDate ? new Date(Y.endDate).toISOString().split("T")[0] : null,
                                        itinerary_river: D?.cruise?.riverName ?? null
                                    })
                                }
                                );
                                const he = this.airService.getAirModel();
                                he && ("Yes" === he.guest1?.bookMyAir && he.guest1?.airFare && me.push({
                                    item_name: "Airfare Package - Guest 1",
                                    affiliation: "CBE",
                                    discount: 0,
                                    item_category: "flight",
                                    item_category2: we ?? null,
                                    item_category3: D?.category?.categoryCode ?? null,
                                    item_category4: D?.cruise?.genericName ?? null,
                                    item_category5: D?.cruise?.shipName ?? null,
                                    price: he.guest1.airFare,
                                    quantity: 1,
                                    embark_city: he.guest1.departureAirportName ?? null,
                                    start_date: he.guest1.departureDate ? new Date(he.guest1.departureDate).toISOString().split("T")[0] : null,
                                    end_date: he.guest1.returningDate ? new Date(he.guest1.returningDate).toISOString().split("T")[0] : null,
                                    itinerary_river: D?.cruise?.riverName ?? null
                                }),
                                "Yes" === he.guest2?.bookMyAir && he.guest2?.airFare && Ee > 1 && me.push({
                                    item_name: "Airfare Package - Guest 2",
                                    affiliation: "CBE",
                                    discount: 0,
                                    item_category: "flight",
                                    item_category2: we ?? null,
                                    item_category3: D?.category?.categoryCode ?? null,
                                    item_category4: D?.cruise?.genericName ?? null,
                                    item_category5: D?.cruise?.shipName ?? null,
                                    price: he.guest2.airFare,
                                    quantity: 1,
                                    embark_city: he.guest2.departureAirportName ?? null,
                                    start_date: he.guest2.departureDate ? new Date(he.guest2.departureDate).toISOString().split("T")[0] : null,
                                    end_date: he.guest2.returningDate ? new Date(he.guest2.returningDate).toISOString().split("T")[0] : null,
                                    itinerary_river: D?.cruise?.riverName ?? null
                                })),
                                this.travelProtectionService.bookingInsuranceAmountGuest1 > 0 && me.push({
                                    item_name: "Insurance \u2013 Guest 1",
                                    affiliation: "CBE",
                                    discount: 0,
                                    item_category: "insurance",
                                    item_category2: we ?? null,
                                    item_category3: "Allianz",
                                    item_category4: D?.cruise?.genericName ?? null,
                                    item_category5: D?.cruise?.shipName ?? null,
                                    price: this.travelProtectionService.bookingInsuranceAmountGuest1,
                                    quantity: 1,
                                    itinerary_river: D?.cruise?.riverName ?? null
                                }),
                                this.travelProtectionService.bookingInsuranceAmountGuest2 > 0 && Ee > 1 && me.push({
                                    item_name: "Insurance \u2013 Guest 2",
                                    affiliation: "CBE",
                                    discount: 0,
                                    item_category: "insurance",
                                    item_category2: we ?? null,
                                    item_category3: "Allianz",
                                    item_category4: D?.cruise?.genericName ?? null,
                                    item_category5: D?.cruise?.shipName ?? null,
                                    price: this.travelProtectionService.bookingInsuranceAmountGuest2,
                                    quantity: 1,
                                    itinerary_river: D?.cruise?.riverName ?? null
                                });
                                let ib = me.reduce( (Y, Me) => Y + Me.price * Me.quantity, 0);
                                ib -= 0 * Ee;
                                const nb = (new Date).toISOString().split("T")[0]
                                  , sb = D?.cruise?.startDate ? new Date(D.cruise.startDate).toISOString().split("T")[0] : null;
                                if (k)
                                    window.dataLayer.push({
                                        event: "begin_checkout",
                                        ecommerce: {
                                            itinerary_region: we ?? null,
                                            departure_date: sb,
                                            booking_date: nb,
                                            currency: q,
                                            locale_code: this.queryParams.site?.toLowerCase(),
                                            value: E,
                                            items: me
                                        }
                                    });
                                else if ("Courtesy_Hold" === this.selectedPaymentOption)
                                    window.dataLayer.push({
                                        event: "courtesy_hold",
                                        ecommerce: {
                                            currency: q,
                                            locale_code: this.queryParams.site?.toLowerCase(),
                                            value: 0,
                                            itinerary_region: we,
                                            departure_date: A,
                                            booking_date: R,
                                            days_out_to_departure: Z,
                                            full_booking_value: E,
                                            payment_option: "7-Day Courtesy Hold",
                                            items: me
                                        }
                                    });
                                else {
                                    const Y = this.invoiceNumber || `TXN-${this.bookingNumber}-${Date.now()}`
                                      , Me = E - this.payableAmount;
                                    let Pe = "";
                                    switch (this.selectedPaymentOption) {
                                    case "First_Deposit":
                                        Pe = "Initial Deposit";
                                        break;
                                    case "Full_Payment":
                                        Pe = "Full Payment";
                                        break;
                                    default:
                                        Pe = this.selectedPaymentOption
                                    }
                                    window.dataLayer.push({
                                        event: "purchase",
                                        ecommerce: {
                                            transaction_id: Y,
                                            currency: q,
                                            locale_code: this.queryParams.site?.toLowerCase(),
                                            value: this.payableAmount,
                                            itinerary_region: we,
                                            departure_date: A,
                                            booking_date: R,
                                            days_out_to_departure: Z,
                                            full_booking_value: E,
                                            amount_left_owed: Me,
                                            payment_option: Pe,
                                            items: me
                                        }
                                    })
                                }
                            }
                            )
                        } catch (v) {
                            console.error("Error in sendDataLayer:", v)
                        }
                    }
                    return p.\u0275fac = function(_) {
