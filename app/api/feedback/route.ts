import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { validateFeedback } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { kesan, pesan } = body
    
    const kesanError = validateFeedback(kesan, "Kesan");

if (kesanError) {
  return NextResponse.json(
    {
      success: false,
      message: kesanError,
    },
    {
      status: 400,
    }
  );
}

const pesanError = validateFeedback(pesan, "Pesan");

if (pesanError) {
  return NextResponse.json(
    {
      success: false,
      message: pesanError,
    },
    {
      status: 400,
    }
  );
}

    const { data, error } = await supabase
      .from("tbl_tr_feedback")
      .insert({
        kesan,
        pesan,
      })
      .select();

    console.log("Data:", data);
    console.log("Supabase Error:", error);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}