-- CreateIndex
CREATE INDEX "AbilityCheck_SuccessNarrationId_idx" ON "AbilityCheck"("SuccessNarrationId");

-- CreateIndex
CREATE INDEX "AbilityCheck_FailureNarrationId_idx" ON "AbilityCheck"("FailureNarrationId");

-- CreateIndex
CREATE INDEX "AbilityCheck_CriticalSuccessNarrationId_idx" ON "AbilityCheck"("CriticalSuccessNarrationId");

-- CreateIndex
CREATE INDEX "AbilityCheck_CriticalFailureNarrationId_idx" ON "AbilityCheck"("CriticalFailureNarrationId");
