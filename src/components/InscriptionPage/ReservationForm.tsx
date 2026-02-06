import React from 'react';

export const ReservationForm: React.FC = () => {
    return (
        <div
            className="relative w-[455px] h-[253px] bg-[#FFF5EE] shadow-lg"
            style={{
                // Explicit dimensions from specs
                width: '455px',
                height: '253px'
            }}
        >
            {/* Inputs Container - Adjusted to left 0 with padding */}
            <div className="absolute left-0 top-[60px] flex flex-col gap-8 w-full pl-[20px]">
                {/* Name Input Group */}
                <div className="flex flex-col gap-1 w-[200px]">
                    <div className="flex justify-between items-end relative">
                        <label className="font-['Hedvig_Letters_Serif'] text-[12px] leading-[16px] text-right tracking-[-0.02em] text-black/60 w-[32px]">
                            name
                        </label>
                        <input
                            type="text"
                            className="absolute left-[40px] bottom-0 w-[120px] bg-transparent border-0 border-b border-black outline-none font-serif text-sm pb-1"
                        />
                    </div>
                </div>

                {/* Email Input Group */}
                <div className="flex flex-col gap-1 w-[200px]">
                    <div className="flex justify-between items-end relative">
                        <label className="font-['Hedvig_Letters_Serif'] text-[12px] leading-[16px] text-right tracking-[-0.02em] text-black/60 w-[31px]">
                            email
                        </label>
                        <input
                            type="email"
                            className="absolute left-[40px] bottom-0 w-[120px] bg-transparent border-0 border-b border-black outline-none font-serif text-sm pb-1"
                        />
                    </div>
                </div>
            </div>

            {/* Title Group - Moved to bottom center */}
            <div className="absolute bottom-[30px] w-full flex justify-center items-center gap-4">
                {/* Line 1 - Rotated */}
                <div className="w-[48px] h-[1px] bg-[#1F2021] border border-[#1F2021] rotate-90 transform" />

                {/* Reservation Text */}
                <div
                    className="font-['Hedvig_Letters_Serif'] font-normal text-[24px] leading-[32px] text-center tracking-[-0.02em] text-[#1F2021]"
                >
                    Reservation
                </div>

                {/* Line 2 - Rotated */}
                <div className="w-[48px] h-[1px] bg-[#1F2021] border border-[#1F2021] rotate-90 transform" />
            </div>
        </div>
    );
};
