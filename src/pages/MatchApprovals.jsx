import React, {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getPendingApprovals,
  approveScore,
  rejectScore,
} from "../services/matchApprovalService";

const MatchApprovals = () => {

  // TEMP ADMIN USER
  const userId = 2;

  const [approvals, setApprovals] =
    useState([]);

  const [reasons, setReasons] =
    useState({});

  useEffect(() => {

    loadApprovals();

  }, []);

  const loadApprovals =
    async () => {

      try {

        const data =
          await getPendingApprovals();

        setApprovals(data);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to load approvals"
        );
      }
    };

  const handleApprove =
    async (matchId) => {

      try {

        await approveScore(
          matchId,
          userId
        );

        alert(
          "Score approved"
        );

        loadApprovals();

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data ||
          "Failed to approve"
        );
      }
    };

  const handleReject =
    async (matchId) => {

      try {

        const reason =
          reasons[matchId];

        if (!reason) {

          alert(
            "Enter reason"
          );

          return;
        }

        await rejectScore(
          matchId,
          userId,
          reason
        );

        alert(
          "Score rejected"
        );

        loadApprovals();

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data ||
          "Failed to reject"
        );
      }
    };

  return (

    <Layout>

      <h1>
        Pending Approvals
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          background: "white",
        }}
      >

        <thead>

          <tr>

            <th>Match</th>

            <th>Score</th>

            <th>
              Submitted By
            </th>

            <th>
              Submitted At
            </th>

            <th>Approve</th>

            <th>Reject</th>

          </tr>

        </thead>

        <tbody>

          {approvals.map(
            (approval) => (

              <tr
                key={
                  approval.matchId
                }
              >

                <td>

                  {
                    approval.homeTeam
                  }

                  {" vs "}

                  {
                    approval.awayTeam
                  }

                </td>

                <td>

                  {
                    approval.homeScore
                  }

                  {" - "}

                  {
                    approval.awayScore
                  }

                </td>

                <td>

                  {
                    approval.submittedBy
                  }

                </td>

                <td>

                  {
                    approval.submittedAt
                  }

                </td>

                <td>

                  <button
                    onClick={() =>
                      handleApprove(
                        approval.matchId
                      )
                    }
                  >
                    Approve
                  </button>

                </td>

                <td>

                  <div
                    style={{
                      display:
                        "flex",

                      flexDirection:
                        "column",

                      gap: "5px",
                    }}
                  >

                    <input
                      type="text"
                      placeholder="Reason"
                      value={
                        reasons[
                          approval
                            .matchId
                        ] || ""
                      }
                      onChange={(
                        e
                      ) =>
                        setReasons(
                          (
                            prev
                          ) => ({
                            ...prev,

                            [approval.matchId]:
                              e.target
                                .value,
                          })
                        )
                      }
                    />

                    <button
                      onClick={() =>
                        handleReject(
                          approval.matchId
                        )
                      }
                    >
                      Reject
                    </button>

                  </div>

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </Layout>
  );
};

export default MatchApprovals;